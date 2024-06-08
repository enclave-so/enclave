import { initV0 } from 'transport/v0'

// eslint-disable-next-line import/prefer-default-export
export function initTransport() {
  window.addEventListener('message', initPort)
}

// Setup the transfered port
function initPort(e: MessageEvent) {
  switch (e.data) {
    case 'v0':
      initV0(e)
      break
  }
}
