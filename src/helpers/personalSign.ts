import { Hex } from 'viem'
import { findWallet } from 'atoms/walletsActions'
import defaultStore from 'helpers/defaultStore'
import getWalletClient from 'helpers/getWalletClient'

export default async function (wallet: Hex, raw: Hex) {
  const key = defaultStore.get(findWallet)(wallet)?.key
  if (!key) return null

  const client = await getWalletClient(key)
  return client.signMessage({
    message: { raw },
  })
}
