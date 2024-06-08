import { all } from 'config'
import { extractChain } from 'viem'

export default function (chainId: number) {
  const keys = all.map((chain) => chain.id)
  const chain = extractChain({
    chains: all,
    id: chainId as (typeof keys)[number],
  })
  return chain
}
