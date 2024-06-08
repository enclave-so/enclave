import { atomWithStorage } from 'jotai/utils'

//allowed apps
export default atomWithStorage<string[]>('apps', [], undefined, {
  getOnInit: true,
})
