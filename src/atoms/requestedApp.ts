import { atomWithStorage } from 'jotai/utils'

export default atomWithStorage<string | null>('requestedApp', null, undefined, {
  getOnInit: true,
})
