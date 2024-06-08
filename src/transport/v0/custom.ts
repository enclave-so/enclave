import { BlockTag, Hex, hexToNumber } from 'viem'
import { Evaluate } from 'types'
import {
  Method,
  Request,
  T,
  generateId,
  origin,
  sendNotification,
  signResolver,
} from 'transport/v0'
import { RawTx } from 'models/Tx'
import { SignPayload } from 'models/SignRequest'
import { addSignRequest } from 'atoms/signRequestsActions'
import apps from 'atoms/apps'
import chainAtom from 'atoms/chain'
import chainId from 'atoms/chainId'
import defaultStore from 'helpers/defaultStore'
import formatTx from 'helpers/formatTx'
import getPublicClient from 'helpers/getPublicClient'
import requestedApp from 'atoms/requestedApp'
import walletsAtom from 'atoms/wallets'

type SupportedMethod = Exclude<
  Method,
  '' | 'enclave_requestAuth' | 'enclave_requestSign' | 'enclave_emit'
>

type Handler = (request: Request) => T
// eslint-disable-next-line import/prefer-default-export
export const handlers: Record<SupportedMethod, Handler> = {
  ['eth_accounts']: accounts,
  ['eth_requestAccounts']: requestAccounts,
  ['eth_chainId']: getChainId,
  ['wallet_requestPermissions']: requestPermissions,
  ['eth_getBlockByNumber']: getBlockByNumber,
  ['eth_getTransactionCount']: getTransactionCount,
  ['eth_maxPriorityFeePerGas']: maxPriorityFeePerGas,
  ['eth_gasPrice']: gasPrice,
  ['eth_estimateGas']: estimateGas,
  ['wallet_switchEthereumChain']: switchEthereumChain,
  ['personal_sign']: personalSign,
  ['eth_signTypedData_v4']: signTypedData,
  ['eth_sendTransaction']: sendTransaction,
  ['eth_signTransaction']: signTransaction,
}
/*TODO:
Account (done)
- getAddresses (done)
- requestAddresses (done)
Assets
- watchAsset
Chain
- addChain
- switchChain (done)
Data
- signMessage (?)
- signTypedData (?)
Permissions
- getPermissions
- requestPermissions (?)
Transaction
- prepareTransactionRequest (?)
- sendRawTransaction
- sendTransaction (?)
- signTransaction
 */

const chain = () => defaultStore.get(chainAtom)
const currentAccount = () => defaultStore.get(walletsAtom)[0]
const publicClient = () => getPublicClient(chain())

//TODO: improve error handling
const MissingParamsErr = 'Missing params'
const WrongAccountErr = 'Wrong account'
const UnauthorizedErr = 'Unauthorized'

const makeSignRequest = (payload: SignPayload): Promise<unknown> => {
  const id = generateId()
  const result = signResolver.wait(id)

  defaultStore.set(addSignRequest, {
    id: id,
    wallet: currentAccount().address,
    app: origin,
    ...payload,
  })

  sendNotification('enclave_requestSign')
  return result
}

function getChainId() {
  return chain().id
}

function accounts() {
  if (!isAuth) return []

  const wallets = defaultStore.get(walletsAtom)
  if (wallets.length > 0) return [wallets[0].address]

  //create new wallet if not exist
  // defaultStore.set(addWallet, createKey())
  // return defaultStore.get(walletsAtom)[0].address
  return []
}

async function requestAccounts() {
  await auth()

  return accounts()
}

//{"id":"255id9ii","method":"wallet_requestPermissions","params":[{"eth_accounts":{}}]}
function requestPermissions() {
  return true //TODO: change
}

//{"id":"79c9i7d9","method":"eth_getBlockByNumber","params":["latest",false]}
function getBlockByNumber({ params }: Request) {
  //TODO: make it less hardcoded? Add support for block number
  const [blockTag, includeTransactions] = params as [BlockTag, boolean]
  return publicClient().getBlock({
    blockTag,
    includeTransactions,
  })
}

//{"id":"bcaice31","method":"eth_getTransactionCount","params":["0x36C319fE33003d9AB0c797e94424F09cfeb0Fe2c","pending"]}
function getTransactionCount({ params }: Request) {
  //TODO: make it less hardcoded?
  const [address, blockTag] = params as [Hex, BlockTag]
  return publicClient().getTransactionCount({
    address,
    blockTag,
  })
}

//{"id":"g1245f9c","method":"eth_maxPriorityFeePerGas"}
function maxPriorityFeePerGas() {
  return publicClient().estimateMaxPriorityFeePerGas()
}

//{"id":"0ddff83f","method":"eth_gasPrice"}
function gasPrice() {
  return publicClient().getGasPrice()
}

//{"id":"9dd56j78","method":"eth_estimateGas","params":[{"from":"0x36C319fE33003d9AB0c797e94424F09cfeb0Fe2c","maxFeePerGas":"0x7650b020a","maxPriorityFeePerGas":"0xf4240","nonce":"0x0","to":"0x70997970c51812dc3a010c7d01b50e0d17dc79c8","value":"0xde0b6b3a7640000"}]}
function estimateGas({ params }: Request) {
  const [rawTx] = params as [RawTx]
  const tx = formatTx(rawTx)
  if (!tx.value) return MissingParamsErr

  const client = publicClient()
  type argsType = Evaluate<Parameters<typeof client.estimateGas>[0]>
  const p = {
    ...tx,
    account: tx.from,
  } as unknown as argsType
  return client.estimateGas(p)
}

//{"id":"8486djc1","method":"personal_sign","params":["0x68656c6c6f20776f726c64","0x36C319fE33003d9AB0c797e94424F09cfeb0Fe2c"]}
function personalSign({ params }: Request) {
  if (!isAuth) return UnauthorizedErr

  const [message, address] = params as [Hex, string]

  const account = currentAccount()
  if (address !== account.address) return WrongAccountErr

  return makeSignRequest({
    method: 'personal_sign',
    message,
  })
}

//{"id":"fh60i3cg","method":"eth_signTypedData_v4","params":["0x36C319fE33003d9AB0c797e94424F09cfeb0Fe2c","{\"domain\":{},\"message\":{\"from\":{\"name\":\"Cow\",\"wallet\":\"0xcd2a3d9f938e13cd947ec05abc7fe734df8dd826\"},\"to\":{\"name\":\"Bob\",\"wallet\":\"0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\"},\"contents\":\"Hello, Bob!\"},\"primaryType\":\"Mail\",\"types\":{\"EIP712Domain\":[],\"Person\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"wallet\",\"type\":\"address\"}],\"Mail\":[{\"name\":\"from\",\"type\":\"Person\"},{\"name\":\"to\",\"type\":\"Person\"},{\"name\":\"contents\",\"type\":\"string\"}]}}"]}
function signTypedData({ params }: Request) {
  if (!isAuth) return UnauthorizedErr //TODO: Maybe make middleware?

  const [address, data] = params as [string, string]

  const account = currentAccount()
  if (address !== account.address) return WrongAccountErr

  return makeSignRequest({
    method: 'eth_signTypedData_v4',
    data,
  })
}

//{"id":"2c5f2330","method":"wallet_switchEthereumChain","params":[{"chainId":"0xaa36a7"}]}
function switchEthereumChain({ params }: Request) {
  if (!isAuth) return UnauthorizedErr

  const [newChain] = params as [{ chainId: Hex }]
  defaultStore.set(chainId, hexToNumber(newChain.chainId))
}

//{"id":"6hfa5ac6","method":"eth_sendTransaction","params":[{"from":"0x36C319fE33003d9AB0c797e94424F09cfeb0Fe2c","gas":"0x5208","to":"0x06397Cb0Ce657277bed8e19D652e32FD42598182","value":"0x3b9aca00"}]}
function sendTransaction({ params }: Request) {
  if (!isAuth) return UnauthorizedErr

  const [rawTx] = params as [RawTx]
  const tx = formatTx(rawTx)

  const account = currentAccount()
  if (tx.from !== account.address) return WrongAccountErr

  //TODO: check possible errors

  return makeSignRequest({
    method: 'eth_sendTransaction',
    chainId: tx.chainId ?? chain().id,
    rawTx: rawTx,
  })
}

//{"id":"cbb5955g","method":"eth_signTransaction","params":[{"to":"0x06397Cb0Ce657277bed8e19D652e32FD42598182","value":"0x2710","from":"0x36C319fE33003d9AB0c797e94424F09cfeb0Fe2c","nonce":"0x7","type":"0x2","maxPriorityFeePerGas":"0x6fc23ac00","maxFeePerGas":"0x1519201728","gas":"0x5208","chainId":"0x89"}]}
function signTransaction({ params }: Request) {
  if (!isAuth) return UnauthorizedErr

  const [rawTx] = params as [RawTx]
  const tx = formatTx(rawTx)

  const account = currentAccount()
  if (tx.from !== account.address) return WrongAccountErr

  //TODO: check possible errors
  return makeSignRequest({
    method: 'eth_signTransaction',
    chainId: tx.chainId ?? chain().id,
    rawTx,
  })
}

// { method: 'enclave_emit', params: { name: 'chainChanged', args: ['0x1', '0x1'] }}
export function sendEvent(name: string, ...args: unknown[]) {
  const event = { name, args }
  sendNotification('enclave_emit', event)
}

//Auth
export let isAuth = false

async function auth(): Promise<boolean> {
  if (isAuth) {
    return true
  }

  isAuth = await requestAuth()
  if (isAuth) {
    sendEvent('connect', { chainId: defaultStore.get(chainId) })
  }

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

  sendNotification('enclave_requestAuth')
  return waitTimeout
}
