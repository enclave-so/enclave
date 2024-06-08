import { createResolver, isAuth, onMessage, sendEvent } from 'transport/v0'
import { removeSignRequest } from 'atoms/signRequestsActions'
import chainId from 'atoms/chainId'
import defaultStore from 'helpers/defaultStore'
import formatURL from 'helpers/formatURL'
import signResponse from 'atoms/signResponse'
import wallets from 'atoms/wallets'

export let port: MessagePort
export let origin: string

export function initV0(e: MessageEvent) {
  console.log('initV0 connection')
  origin = formatURL(e.origin)
  port = e.ports[0]
  port.onmessage = onMessage

  //event emitter
  // defaultStore.sub(providerEvent, () => {
  //   const pe = defaultStore.get(providerEvent)
  //   if (pe === null) return

  //   sendEvent(pe.name, ...pe.args)
  //   defaultStore.set(providerEvent, null)
  // })

  //wallets emitter
  defaultStore.sub(wallets, () => {
    if (!isAuth) return // sendEvent & sendNotification only when authorized

    const ws = defaultStore.get(wallets)
    const address = ws[0].address
    sendEvent('accountsChanged', [address])
  })

  //chainId emitter
  defaultStore.sub(chainId, () => {
    if (!isAuth) return // sendEvent & sendNotification only when authorized

    const cid = defaultStore.get(chainId)
    sendEvent('chainChanged', cid)
  })

  //signResponse solver
  defaultStore.sub(signResponse, () => {
    const sr = defaultStore.get(signResponse)
    if (sr === null) return

    defaultStore.set(removeSignRequest, sr.id) //TODO: fix, its temp solution cause jotai have cache of signRequests
    signResolver.handle(sr.id, sr.result)
    //no need to null cause many apps can listen to diffrent responses
  })
}

export const signResolver = createResolver()
