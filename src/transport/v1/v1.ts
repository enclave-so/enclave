import { createTransport } from 'transport/v1'
import { handlers } from 'transport/v1/handlers'
import formatURL from 'helpers/formatURL'

const opener = window.opener as Window | null
const origin = formatURL(document.referrer)

const sendMsg = (message: string) => {
  opener!.postMessage(message, '*')
}

function initV1() {
  if (!opener) return
  console.log('init v1')

  const transport = createTransport(sendMsg, handlers)

  window.addEventListener('message', (e) => {
    if (formatURL(e.origin) !== origin) return
    transport.onMessage(e)
  })
  opener.postMessage('popupLoaded', '*')
}

export { initV1, origin }
