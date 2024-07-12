import { provider } from '@enclave-so/sdk'
import { createStore } from 'mipd'

const store = createStore()

function announce() {
  provider.announce()
}

declare global {
  interface Window {
    ethereum?: any
  }
}

function inject() {
  if (typeof window !== 'undefined' && window.ethereum === undefined) {
    window.ethereum = provider
  }
}

function modestConnect() {
  if (store.findProvider({ rdns: 'so.enclave.app' }) !== undefined) return //TODO: change to wallet

  announce()
  inject()
}

setTimeout(modestConnect, 4 * 1000)
