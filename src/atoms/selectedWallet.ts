import { atom } from 'jotai'
import selectedAddress from 'atoms/selectedAddress'
import wallets from 'atoms/wallets'

export default atom((get) => {
  const address = get(selectedAddress) ?? get(wallets)[0]?.address
  return get(wallets).find((w) => w.address === address)
})
