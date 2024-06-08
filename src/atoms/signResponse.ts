import { atomWithStorage } from 'jotai/utils'

export default atomWithStorage<{
  id: string
  result: unknown
} | null>('signResponse', null, undefined, {
  getOnInit: true,
})
