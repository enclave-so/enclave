const POPUP_WIDTH = 420
const POPUP_HEIGHT = 540
const popupLoaded = 'popupLoaded'

const openPopup = (url: URL): Window => {
  const left = (window.innerWidth - POPUP_WIDTH) / 2 + window.screenX
  const top = (window.innerHeight - POPUP_HEIGHT) / 2 + window.screenY

  const popup = window.open(
    url.toString(),
    'Smart Wallet',
    `width=${POPUP_WIDTH}, height=${POPUP_HEIGHT}, left=${left}, top=${top}`
  )
  popup?.focus()
  if (!popup) {
    throw 'Popup window failed to open'
  }
  return popup
}

const closePopup = (popup: Window | null) => {
  if (popup && !popup.closed) {
    popup.close()
  }
}

const waitForPopupLoaded = (url: URL): Promise<void> => {
  return new Promise((resolve, reject) => {
    const messageHandler = (event: MessageEvent) => {
      if (event.origin === url.origin && event.data === popupLoaded) {
        window.removeEventListener('message', messageHandler)
        resolve()
      }
    }

    window.addEventListener('message', messageHandler)

    setTimeout(() => {
      window.removeEventListener('message', messageHandler)
      reject('Popup failed to load within the expected time')
    }, 60 * 1000)
  })
}

export { openPopup, closePopup, waitForPopupLoaded, popupLoaded }
