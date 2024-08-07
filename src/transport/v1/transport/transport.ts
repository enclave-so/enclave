import {
  Err,
  createErr,
  createResolver,
  deserialize,
  generateId,
  isErr,
  serialize,
} from '.'

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
  error?: Err
}
type Request = BaseMessage & RequestArgs
type Response = BaseMessage & ResponseArgs
type MessageT = Request | Response

type Handler = (args: RequestArgs) => T | Err
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
    console.log('send', serialize(message))
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

  const sendResponse = (args: Response) => {
    if (args.id === '') return
    sendMessage(args)
  }

  const handleRequest = async (request: Request) => {
    const { id } = request

    const handler = handlers[request.method]
    if (!handler) {
      console.error('Unsupported method', request.method)
      sendResponse({ id, error: createErr('Method not found') })
      return
    }

    const result = await handler(request)
    if (isErr(result)) {
      sendResponse({ id, error: result })
      return
    }

    sendResponse({ id, result })
  }

  const onMessage = (e: MessageEvent) => {
    const msg = deserialize(e.data) as MessageT
    console.log('received', e.data)
    if (isRequest(msg)) {
      handleRequest(msg)
    } else if (msg.error) {
      messageResolver.handle(msg.id, msg.error)
    } else {
      messageResolver.handle(msg.id, msg.result)
    }
  }

  // port.onmessage = onMessage
  return { sendRequest, onMessage }
}

export type { Handlers, RequestArgs }
export { createTransport }
