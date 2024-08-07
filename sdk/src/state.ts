import EventEmitter from 'eventemitter3'
import { createPopup } from './popup'
import { createErr, Handlers, RequestArgs } from './transport'
import { Hex, hexToNumber, toHex } from 'viem'
import { getPublicClient } from './client'

function createState(url: string) {
  const emitter = new EventEmitter()
  const emit = emitter.emit.bind(emitter)
  const on = emitter.on.bind(emitter)
  const removeListener = emitter.removeListener.bind(emitter)

  const popup = createPopup(new URL(url))

  let accounts: Hex[] = []
  let chainId = 1

  const isConnected = () => accounts.length > 0

  const connect = async () => {
    if (isConnected()) return
    accounts = await popup.sendRequest({
      method: 'eth_requestAccounts',
    })
    popup.close()

    if (!isConnected()) return
    emit('connect', { chainId: toHex(chainId) })
    emit('accountsChanged', accounts)
  }

  //handlers
  async function requestAccounts() {
    await connect()
    return accounts
  }

  const getAccounts = () => accounts
  const getChainId = () => toHex(chainId)
  const requestPermissions = () => true //TODO: implement

  function switchChain(args: RequestArgs) {
    if (!isConnected()) return //TODO: need to check isConnected?
    const [chainArgs] = args.params as [{ chainId: Hex }]

    const newChainId = hexToNumber(chainArgs.chainId)
    if (chainId === newChainId) return null

    chainId = newChainId
    emit('chainChanged', chainArgs.chainId)
  }

  const direct = async <T = unknown>(args: RequestArgs) => {
    if (!isConnected()) return createErr('Resource unavailable')
    await popup.sendRequest({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: toHex(chainId) }],
    })
    const enclaveAccounts: Hex[] = await popup.sendRequest({
      method: 'eth_accounts',
    })
    if (accounts[0] != enclaveAccounts[0]) {
      accounts = enclaveAccounts
      emit('accountsChanged', accounts)
      popup.close()
      return createErr('Invalid params')
    }
    const result = await popup.sendRequest<T>(args)
    popup.close()
    return result
  }

  const publicAction = async (args: RequestArgs) => {
    const client = getPublicClient(chainId)
    return client.request(args)
  }

  const handlers: Handlers = {
    ['eth_requestAccounts']: requestAccounts,
    ['personal_sign']: direct,
    ['eth_signTransaction']: direct,
    ['eth_sendTransaction']: direct,
    ['eth_signTypedData_v4']: direct,
    ['eth_accounts']: getAccounts,
    ['eth_chainId']: getChainId,
    ['wallet_switchEthereumChain']: switchChain,
    ['wallet_requestPermissions']: requestPermissions,
  }

  async function handleRequest(args: RequestArgs) {
    const handler = handlers[args.method]
    if (handler) {
      return await handler(args)
    }

    return publicAction(args)
  }

  return { on, removeListener, handleRequest }
}

export { createState }
