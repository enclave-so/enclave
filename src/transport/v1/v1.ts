import { createTransport } from 'transport/v1'
import { handlers } from 'transport/v1/handlers'
import formatURL from 'helpers/formatURL'

const opener = window.opener as Window | null

const sendMsg = (message: string) => {
  opener!.postMessage(message, '*')
}

// eslint-disable-next-line import/prefer-default-export
export function initV1() {
  if (!opener) return
  console.log('init v1')

  const transport = createTransport(sendMsg, handlers)

  // window.addEventListener('message', transport.onMessage)
  window.addEventListener('message', (e) => {
    //TODO: check document.referrer in Safari
    if (formatURL(e.origin) !== formatURL(document.referrer)) return
    transport.onMessage(e)
  })
  opener.postMessage('popupLoaded', '*')
}
