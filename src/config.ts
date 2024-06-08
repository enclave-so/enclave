import * as chains from 'wagmi/chains'
import { Chain } from 'wagmi/chains'
import { createConfig, http } from 'wagmi'

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

export const all = Object.values(chains) as Chain[]
const excludeMainnet = all.filter((x) => x.id !== chains.mainnet.id)
const transports = Object.assign({}, ...all.map((x) => ({ [x.id]: http() })))

const config = createConfig({
  chains: [chains.mainnet, ...excludeMainnet],
  transports,
})

export default config
