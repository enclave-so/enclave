import { createTransport } from './transport'
import {
  openPopup,
  closePopup,
  waitForPopupLoaded,
  popupLoaded,
} from './helpers'

const createPopup = (url: URL) => {
  let sharedPopup: Window | null = null

  const initializePopup = async (): Promise<Window> => {
    if (sharedPopup && !sharedPopup.closed) {
      sharedPopup.focus()
      return sharedPopup
    }

    sharedPopup = openPopup(url)
    await waitForPopupLoaded(url) //TODO: race condition here?

    return sharedPopup! //We just checked that it is not null
  }

  const sendMsg = async (message: string) => {
    const popup = await initializePopup()
    popup.postMessage(message, url.origin)
  }

  const close = () => {
    closePopup(sharedPopup) //Sometimes blocked on Arc
    sharedPopup = null
  }

  const { sendRequest, onMessage } = createTransport(sendMsg)

  window.addEventListener('message', (event: MessageEvent) => {
    if (event.origin === url.origin && event.data !== popupLoaded) {
      onMessage(event)
    }
  })

  return { sendRequest, close }
}

export { createPopup }
