import { useAtom } from 'jotai'
import RequestSign from 'components/RequestSign'
import Wallet from 'components/Wallet'
import router from 'atoms/router'

export default function () {
  const [route] = useAtom(router)

  switch (route.path) {
    case 'default':
      return <Wallet />
    case 'sign':
      return <RequestSign />
  }
}
