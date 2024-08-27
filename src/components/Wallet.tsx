import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useAtom } from 'jotai'
import getEmoji from 'helpers/getEmoji'
import selectedWallet from 'atoms/selectedWallet'

export default function () {
  const [wallet] = useAtom(selectedWallet)

  if (!wallet) {
    return null
  }

  return (
    <div role="button" className="m-1 text-lg flex flex-row">
      <span className="mr-1 py-1 px-1.5 bg-amber-100 rounded-md">
        {getEmoji(wallet.address)}
      </span>
      <span className="font-bold">
        {wallet.address.slice(0, 6) + '•••' + wallet.address.slice(-4)}
      </span>
      <span className="text-gray-500 ml-1">
        <ChevronRightIcon className="w-6 h-6 ml-1" />
      </span>
    </div>
  )
}
