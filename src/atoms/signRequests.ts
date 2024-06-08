import { atomWithStorage } from 'jotai/utils'
import SignRequest from 'models/SignRequest'

export default atomWithStorage<SignRequest[]>('signRequests', [], undefined, {
  getOnInit: true,
})
