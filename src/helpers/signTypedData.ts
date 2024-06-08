import { Hex } from 'viem'
import { findWallet } from 'atoms/walletsActions'
import defaultStore from 'helpers/defaultStore'
import getWalletClient from 'helpers/getWalletClient'

export default async function (wallet: Hex, data: string) {
  const key = defaultStore.get(findWallet)(wallet)?.key
  if (!key) return null

  const client = await getWalletClient(key)

  const args = JSON.parse(data) //TODO: does we need type assertion?
  return client.signTypedData(args)
}
