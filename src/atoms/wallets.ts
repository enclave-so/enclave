import { atomWithStorage } from 'jotai/utils'
import Wallet from 'models/Wallet'

export default atomWithStorage<Wallet[]>('wallets', [], undefined, {
  getOnInit: true,
})
