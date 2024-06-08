import { Hex } from 'viem'

interface Wallet {
  address: Hex
  key: string //TODO: rename because its private key and mnemonic at the same time
  //TODO: rename to secret
  //TODO: add name
}

// type Wallet = PrivateKeyWallet | HDWallet
export default Wallet
