import { useAtom } from 'jotai'
import RequestSign from 'components/RequestSign'
import Wallet from 'components/Wallet'
import Wallets from 'components/Wallets'
import router from 'atoms/router'

export default function () {
  const [route] = useAtom(router)

  switch (route.path) {
    case 'default':
      return <Wallet />
    case 'sign':
      return <RequestSign />
    case 'wallets':
      return <Wallets />
  }
}
