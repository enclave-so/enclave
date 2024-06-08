import { formatUnits } from 'viem'
import getChain from 'helpers/getChain'

export default function (value: bigint, chainId: number) {
  const chain = getChain(chainId)
  return `${formatUnits(value, chain.nativeCurrency.decimals)} ${chain.nativeCurrency.symbol}`
}
