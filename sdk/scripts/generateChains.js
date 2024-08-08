import * as chains from 'viem/chains'
import fs from 'fs'

const supportedTestnets = [
  11155111, // Sepolia
  84532, // Base Testnet
  80001, // Mumbai
]
const customChains = Object.values(chains)
  .filter(
    (chain) => !chain.testnet || supportedTestnets.includes(chain.id)
  )
  .map((chain) => ({
    id: chain.id,
    rpc: chain.rpcUrls.default.http[0],
  }))

fs.writeFileSync('src/chains.json', JSON.stringify(customChains, null, 2))
console.log('Chains data has been written to src/chains.json')
