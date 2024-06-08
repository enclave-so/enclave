import { EventEmitter } from 'eventemitter3'
import { Method, sendRequest } from './transport'
import { EIP1193Provider as MipdProvider } from 'mipd'
// import { EIP1193Provider as ViemProvider } from 'viem'

//EIP1193Provider
class Provider extends EventEmitter implements MipdProvider {
  //ViemProvider
  request<T = unknown>({
    method,
    params,
  }: {
    method: string
    params?: unknown[] | object | unknown
  }) {
    return sendRequest(method as Method, params) as Promise<T>
  }
}

export default new Provider()
// function createProvider() {
//   const emitter = new EventEmitter()
//   //Object.create(emitter)
//   return Object.assign(emitter, {
//     request<T = unknown>({
//       method,
//       params,
//     }: {
//       method: string
//       params?: unknown[] | object | unknown
//     }) {
//       return sendRequest(method as Method, params) as Promise<T>
//     },
//   })
// }

// export default createProvider()
