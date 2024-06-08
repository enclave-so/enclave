import { Chain, createPublicClient, http } from 'viem'

export default function (chain: Chain) {
  const publicClient = createPublicClient({
    chain,
    transport: http(),
  })
  return publicClient
}
