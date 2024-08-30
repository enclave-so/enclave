import { atom } from 'jotai'

type Router =
  | {
      path: 'default'
    }
  | {
      path: 'sign'
    }
  | {
      path: 'wallets'
    }

export default atom<Router>({ path: 'default' })
