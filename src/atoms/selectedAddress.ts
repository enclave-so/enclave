import { Hex } from 'viem'
import { atomWithStorage } from 'jotai/utils'

export default atomWithStorage<Hex | null>(
  'selected_address',
  null,
  undefined,
  {
    getOnInit: true,
  }
)
