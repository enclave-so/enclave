import { createTransport } from 'transport/v1'
import { handlers, signResolver } from 'transport/v1/handlers'
import { removeSignRequest } from 'atoms/signRequestsActions'
import defaultStore from 'helpers/defaultStore'
import formatURL from 'helpers/formatURL'
import signResponse from 'atoms/signResponse'

const opener = window.opener as Window | null
let origin: string

const sendMsg = (message: string) => {
  opener!.postMessage(message, '*')
}

function initV1() {
  if (!opener) return
  console.log('init v1')

  const transport = createTransport(sendMsg, handlers)

  window.addEventListener('message', (e) => {
    if (formatURL(e.origin) === formatURL(window.location.href)) return //its extensions
    if (origin === undefined) origin = formatURL(e.origin) //TODO: its tricky, remake, add origin to every message
    // if (formatURL(e.origin) !== origin) return
    transport.onMessage(e)
  })
  opener.postMessage('popupLoaded', '*')

  //signResponse solver
  defaultStore.sub(signResponse, () => {
    const sr = defaultStore.get(signResponse)
    if (sr === null) return

    defaultStore.set(removeSignRequest, sr.id) //TODO: fix, its temp solution cause jotai have cache of signRequests
    signResolver.handle(sr.id, sr.result)
    //no need to null cause many apps can listen to diffrent responses
  })
}

export { initV1, origin }
