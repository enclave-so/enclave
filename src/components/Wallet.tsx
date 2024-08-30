import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useAtom } from 'jotai'
import getEmoji from 'helpers/getEmoji'
import router from 'atoms/router'
import selectedWallet from 'atoms/selectedWallet'

export default function () {
  const [wallet] = useAtom(selectedWallet)
  const [, setRoute] = useAtom(router)

  if (!wallet) {
    return null
  }

  return (
    <div
      role="button"
      className="m-1 text-lg flex flex-row items-center"
      onClick={() => setRoute({ path: 'wallets' })}
    >
      <span className="mr-2 py-1 px-2 bg-amber-100 rounded-md">
        {getEmoji(wallet.address)}
      </span>
      <span className="font-bold text-xl">
        {wallet.address.slice(0, 6) + '•••' + wallet.address.slice(-4)}
      </span>
      <span className="text-gray-500">
        <ChevronRightIcon className="w-6 h-6 stroke-2" />
      </span>
    </div>
  )
}
