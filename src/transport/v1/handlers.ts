import {
  Handlers,
  RequestArgs,
  createErr,
  createResolver,
  generateId,
  origin,
} from 'transport/v1'
import { Hex, hexToNumber, isAddressEqual } from 'viem'
import { RawTx } from 'models/Tx'
import { SignPayload } from 'models/SignRequest'
import { addSignRequest } from 'atoms/signRequestsActions'
import { mainnet } from 'viem/chains'
import apps from 'atoms/apps'
import defaultStore from 'helpers/defaultStore'
import formatTx from 'helpers/formatTx'
import requestedApp from 'atoms/requestedApp'
import track from 'helpers/track'
import walletsAtom from 'atoms/wallets'

type Method =
  | 'eth_requestAccounts'
  | 'eth_accounts'
  | 'eth_chainId'
  | 'wallet_switchEthereumChain'
  | 'personal_sign'
  | 'eth_signTypedData_v4'
  | 'eth_sendTransaction'
  | 'eth_signTransaction'

// eslint-disable-next-line import/prefer-default-export
export const handlers: Handlers<Method> = {
  ['eth_requestAccounts']: requestAccounts,
  ['eth_accounts']: accounts,
  ['eth_chainId']: getChainId,
  ['wallet_switchEthereumChain']: switchEthereumChain,
  ['personal_sign']: personalSign,
  ['eth_signTypedData_v4']: signTypedData,
  ['eth_sendTransaction']: sendTransaction,
  ['eth_signTransaction']: signTransaction,
}

//Accounts
function accounts() {
  if (!checkAuth()) return []

  const wallets = defaultStore.get(walletsAtom)
  if (wallets.length > 0) return [wallets[0].address]

  //create new wallet if not exist
  // defaultStore.set(addWallet, createKey())
  // return defaultStore.get(walletsAtom)[0].address
  return []
}

async function requestAccounts() {
  await auth()

  await track('connect', { app: origin })
  return accounts()
}

//Sign
const currentAccount = () => defaultStore.get(walletsAtom)[0]
const signResolver = createResolver()

const makeSignRequest = (payload: SignPayload): Promise<unknown> => {
  const id = generateId()
  const result = signResolver.wait(id)

  defaultStore.set(addSignRequest, {
    id: id,
    wallet: currentAccount().address,
    app: origin,
    ...payload,
  })

  return result
}

function personalSign({ params }: RequestArgs) {
  if (!checkAuth()) return createErr('Resource unavailable')

  const [message, address] = params as [Hex, Hex]

  if (!message.startsWith('0x')) return createErr('Invalid params')

  const account = currentAccount()
  if (!isAddressEqual(address, account.address))
    return createErr('Invalid params')

  return makeSignRequest({
    method: 'personal_sign',
    message,
  })
}

function signTypedData({ params }: RequestArgs) {
  if (!checkAuth()) return createErr('Resource unavailable') //TODO: Maybe make middleware?

  const [address, data] = params as [Hex, string]

  const account = currentAccount()
  if (!isAddressEqual(address, account.address))
    return createErr('Invalid params')

  return makeSignRequest({
    method: 'eth_signTypedData_v4',
    data,
  })
}

function sendTransaction({ params }: RequestArgs) {
  if (!checkAuth()) return createErr('Resource unavailable')

  const [rawTx] = params as [RawTx]
  const tx = formatTx(rawTx)

  const account = currentAccount()
  if (!isAddressEqual(tx.from, account.address))
    return createErr('Invalid params')

  //TODO: check possible errors

  return makeSignRequest({
    method: 'eth_sendTransaction',
    chainId: tx.chainId ?? chainId,
    rawTx: rawTx,
  })
}

function signTransaction({ params }: RequestArgs) {
  if (!checkAuth()) return createErr('Resource unavailable')

  const [rawTx] = params as [RawTx]
  const tx = formatTx(rawTx)

  const account = currentAccount()
  if (!isAddressEqual(tx.from, account.address))
    return createErr('Invalid params')

  //TODO: check possible errors
  return makeSignRequest({
    method: 'eth_signTransaction',
    chainId: tx.chainId ?? chainId,
    rawTx,
  })
}
export { signResolver }

//Chain
let chainId: number = mainnet.id

function getChainId() {
  return chainId
}

function switchEthereumChain({ params }: RequestArgs) {
  if (!checkAuth()) return createErr('Resource unavailable')

  const [chain] = params as [{ chainId: Hex }]
  // defaultStore.set(chainId, hexToNumber(newChain.chainId))
  chainId = hexToNumber(chain.chainId)
}

//Auth
export let isAuth = false

//TODO: popup doesnt close on Disallow
async function auth(): Promise<boolean> {
  if (isAuth) {
    return true
  }

  isAuth = await requestAuth()

  return isAuth
}

function requestAuth(): Promise<boolean> {
  if (defaultStore.get(apps).includes(origin)) {
    return Promise.resolve(true)
  }

  defaultStore.set(requestedApp, origin)

  let resolveWaitTimeout: (value: boolean) => void
  let timeoutID: number
  const waitTimeout = new Promise<boolean>((resolve) => {
    resolveWaitTimeout = resolve
    timeoutID = setTimeout(resolve, 1000 * 60 * 10, false)
  })

  const unsub = defaultStore.sub(apps, () => {
    if (defaultStore.get(apps).includes(origin)) {
      resolveWaitTimeout(true)
      clearTimeout(timeoutID)
      unsub()
    }
  })

  return waitTimeout
}

function checkAuth() {
  return isAuth || defaultStore.get(apps).includes(origin)
}
