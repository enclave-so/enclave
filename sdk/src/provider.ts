import {
  EIP6963ProviderInfo,
  // EIP1193Provider as MipdProvider,
  announceProvider,
} from 'mipd'
import { Config, defaultConfig } from './config'
import { isErr, RequestArgs } from './transport'
import logo from './logo'
import { createState } from './state'

function createProvider(config: Partial<Config> = {}) {
  const options: Config = {
    ...defaultConfig,
    ...config,
  }

  const { on, removeListener, handleRequest } = createState(options.url)

  async function request<T = unknown>(args: RequestArgs): Promise<T> {
    // console.log('request', args)
    const result = await handleRequest(args)
    if (isErr(result)) {
      return Promise.reject(result) //This doesnt works
    }
    //TODO: continue here
    return result as Promise<T>
  }

  function announce(info: Partial<EIP6963ProviderInfo> = {}) {
    return announceProvider({
      info: {
        icon: logo,
        name: 'Enclave',
        rdns: 'so.enclave.wallet',
        uuid: '6a82a4f7-ba00-469b-b146-66b7fb5197a9',
        ...info,
      },
      provider: providerInstance,
    })
  }

  const providerInstance = {
    request,
    on,
    removeListener,
    announce,
  }

  return providerInstance //as MipdProvider
}

const provider = createProvider()
export { provider, createProvider }

// export default new Provider()
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
