import { atom } from 'jotai'

type Router =
  | {
      path: 'default'
    }
  | {
      path: 'sign'
    }

export default atom<Router>({ path: 'default' })
