import { Evaluate } from 'types'
import { Hex } from 'viem'
import { RawTx } from 'models/Tx'
import { findWallet } from 'atoms/walletsActions'
import defaultStore from 'helpers/defaultStore'
import formatTx from 'helpers/formatTx'
import getChain from 'helpers/getChain'
import getWalletClient from 'helpers/getWalletClient'

export default async function (wallet: Hex, chainId: number, rawTx: RawTx) {
  const key = defaultStore.get(findWallet)(wallet)?.key
  if (!key) return null

  const chain = getChain(chainId)
  const tx = formatTx(rawTx)
  const client = await getWalletClient(key, chain)

  type argsType = Evaluate<Parameters<typeof client.signTransaction>[0]>
  const args = tx as unknown as argsType
  return client.signTransaction(args)
}
