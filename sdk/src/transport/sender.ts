import { Config } from '../config'
import { onMessage } from '.'
import { announceProvider } from 'mipd'
import logo from '../logo'
import provider from '../provider'

const channel = new MessageChannel()
export const port = channel.port1

export let opts: Config

const iframe = document.createElement('iframe')

let isLoaded = false
export function inject(options: Partial<Config> = {}) {
  //injectProvider?
  if (isLoaded) {
    console.warn('Iframe has already been loaded. Cannot reload.')
    return false
  }
  isLoaded = true

  //define config
  opts = {
    ...{
      // Default options
      url: 'https://app.enclave.so',
      announce: true,
      withBadge: false,
      info: {
        icon: logo,
        name: 'Enclave',
        rdns: 'so.enclave.app',
        uuid: '6a82a4f7-ba00-469b-b146-66b7fb5197a9',
      },
    },
    ...options,
  }

  if (opts.withBadge) {
    opts.info.name = `${opts.info.name} (Builtin)`
  }

  // Set the iframe URL
  iframe.src = opts.url

  //Hide the iframe
  iframe.style.position = 'absolute'
  iframe.style.top = '0'
  iframe.style.left = '0'
  iframe.style.width = '0'
  iframe.style.height = '0'
  iframe.style.border = '0'
  iframe.style.visibility = 'hidden'
  iframe.ariaHidden = 'true'
  iframe.tabIndex = -1
  // Minimal
  // iframe.style.display = 'none'
  // iframe.style.height = '0px'
  // iframe.style.width = '0px'

  // Wait for the iframe to load
  iframe.addEventListener('load', onLoad)

  // Create a promise that resolves when the iframe is loaded
  const isReady = new Promise<boolean>((resolve) => {
    iframe.addEventListener('load', () => {
      resolve(true)
    })
  })

  document.body.appendChild(iframe)

  return isReady
}

function onLoad() {
  // Listen for messages on port1
  port.onmessage = onMessage
  // Transfer port2 to the iframe
  iframe.contentWindow!.postMessage('v0', opts.url, [channel.port2])

  if (opts.announce) {
    announceProvider({
      info: opts.info,
      provider: provider,
    })
  }
}
