import { atomWithStorage } from 'jotai/utils'
import { mainnet } from 'viem/chains'

export default atomWithStorage<number>('chainId', mainnet.id, undefined, {
  getOnInit: true,
})
