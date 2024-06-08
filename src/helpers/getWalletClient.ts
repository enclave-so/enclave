import { Chain, createWalletClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { unmarshal } from 'helpers/secret'
import getAccount from 'helpers/getAccount'

export default async function (key: string, chain: Chain = mainnet) {
  //cause we no need chainId for signMessage & signTypedData, but it require transport
  //TODO: understand why without chain it doesn't work (it doesnt see transport)

  const k = await unmarshal(key)
  const account = getAccount(k)

  const walletClient = await createWalletClient({
    account,
    chain,
    transport: http(),
  })
  return walletClient
}
