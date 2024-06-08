import { createResolver, deserialize, handlers, port, serialize } from '.'

/// shared between sender and receiver
type ETHMethod =
  | 'eth_accounts'
  | 'eth_requestAccounts'
  | 'eth_chainId'
  | 'wallet_requestPermissions'
  | 'wallet_switchEthereumChain'
  | 'personal_sign'
  | 'eth_signTypedData_v4'
  | 'eth_getBlockByNumber'
  | 'eth_getTransactionCount'
  | 'eth_maxPriorityFeePerGas'
  | 'eth_gasPrice'
  | 'eth_estimateGas'
  | 'eth_sendTransaction'
  | 'eth_signTransaction'
type EnclaveMethod =
  | ''
  | 'enclave_requestAuth'
  | 'enclave_requestSign'
  | 'enclave_emit'
type Method = ETHMethod | EnclaveMethod

type BaseMessage = {
  id: string
  method: Method
}
type T = unknown[] | object | unknown
type Request = BaseMessage & { params?: T }
type Response = BaseMessage & { result?: T }
type MessageT = Request | Response

const messageResolver = createResolver()

function onMessage(e: MessageEvent) {
  // console.log('receive', e.data)
  const msg = deserialize(e.data) as MessageT
  if (msg.method == undefined || msg.method == '') {
    const { id, result } = msg as Response
    messageResolver.handle(id, result)
  } else {
    handleRequest(msg)
  }
}

async function handleRequest(request: Request) {
  const handler = handlers[request.method as keyof typeof handlers] // Add type assertion to keyof typeof handlers
  if (handler) {
    const result = await handler(request)
    sendResponse(request.id, result)
  } else {
    console.error('Unknown method', request.method)
    sendResponse(request.id, 'Unknown method')
  }
}

function sendMessage(message: MessageT) {
  // console.log('send', serialize(message))
  port.postMessage(serialize(message))
}

const generateId = (length = 8) =>
  Math.random()
    .toString(20)
    .substring(2, length + 2)

const sendRequest = (method: Method, params?: T, id: string = generateId()) => {
  const response = messageResolver.wait(id)
  sendMessage({ id, method, params } as Request)
  return response
}
const sendNotification = (method: Method, params?: T) => {
  sendMessage({ id: '', method, params } as Request)
}
const sendResponse = (id: string, result?: T) => {
  if (id === '') return
  sendMessage({ id, method: '', result } as Response)
}

export type { Request, Method, T, MessageT }
export { onMessage, generateId, sendRequest, sendNotification, sendResponse }