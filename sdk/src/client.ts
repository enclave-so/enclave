import { createPublicClient, http } from 'viem'
import customChains from './chains.json'

type CustomChain = {
  id: number
  rpc: string
}

const allChains = customChains as CustomChain[]

function getChain(chainId: number) {
  const chain = allChains.find((chain) => chain.id === chainId)!
  return chain
}

function getPublicClient(chain: number): ReturnType<typeof createPublicClient> {
  const chainConfig = getChain(chain)
  return createPublicClient({
    batch: {
      multicall: true,
    },
    transport: http(chainConfig.rpc),
  })
}

export { getPublicClient, getChain }
