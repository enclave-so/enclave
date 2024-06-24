import { createResolver, deserialize, generateId, serialize } from '.'

type BaseMessage = {
  id: string
}
type T = unknown[] | object | unknown
type RequestArgs = {
  method: string
  params?: T
}
type ResponseArgs = {
  result?: T
}
type Request = BaseMessage & RequestArgs
type Response = BaseMessage & ResponseArgs
type MessageT = Request | Response

type Handler = (args: RequestArgs) => T
type Handlers<T extends string | number | symbol = string> = Record<T, Handler>

function isRequest(msg: MessageT): msg is Request {
  return (msg as Request).method !== undefined
}

function createTransport(
  sendMsg: (msg: string) => void,
  handlers: Handlers = {}
) {
  const messageResolver = createResolver()

  const sendMessage = (message: MessageT) => {
    //port.postMessage(serialize(message))
    // console.log('send', serialize(message))
    sendMsg(serialize(message))
  }

  const sendRequest = <ReturnType = unknown>(
    args: RequestArgs,
    id: string = generateId()
  ) => {
    const response = messageResolver.wait(id)
    sendMessage({ id, ...args } as Request)
    return response as Promise<ReturnType>
  }

  // const sendNotification = (method: string, params?: T) => {
  //   sendMessage({ id: '', method, params } as Request)
  // }

  const sendResponse = (id: string, result?: T) => {
    if (id === '') return
    sendMessage({ id, result } as Response)
  }

  const handleRequest = async (request: Request) => {
    const handler = handlers[request.method]
    if (handler) {
      const result = await handler(request)
      sendResponse(request.id, result)
    } else {
      console.error('Unsupported method', request.method)
      sendResponse(request.id, 'Unsupported method')
    }
  }

  const onMessage = (e: MessageEvent) => {
    const msg = deserialize(e.data) as MessageT
    // console.log('received', e.data)
    if (isRequest(msg)) {
      handleRequest(msg)
    } else {
      messageResolver.handle(msg.id, msg.result)
    }
  }

  // port.onmessage = onMessage
  return { sendRequest, onMessage }
}

export type { Handlers, RequestArgs }
export { createTransport }
