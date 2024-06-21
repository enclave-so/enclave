import { atomWithStorage } from 'jotai/utils'
import Wallet from 'models/Wallet'

export default atomWithStorage<Wallet[]>('preview_wallets', [], undefined, {
  getOnInit: true,
})
