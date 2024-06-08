import { Method, Request, T, opts } from '.'
import provider from '../provider'

type SupportedMethod = Exclude<
  Method,
  | ''
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
>

type Handler = (request: Request) => T
// eslint-disable-next-line import/prefer-default-export
export const handlers: Record<SupportedMethod, Handler> = {
  ['enclave_requestAuth']: auth,
  ['enclave_requestSign']: sign,
  ['enclave_emit']: emit,
}

function auth() {
  window.open(opts.url, '_blank')
}

function sign() {
  window.open(opts.url, '_blank')
}

function emit({ params }: Request) {
  const { name, args } = params as { name: string; args: unknown[] }
  provider.emit(name, ...args)
}
