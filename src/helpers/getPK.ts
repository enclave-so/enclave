import { HDKey } from '@scure/bip32'
import { bytesToHex } from 'viem'
import { mnemonicToSeedSync } from '@scure/bip39'

//mnemonic to private key
//https://github.com/wevm/viem/discussions/1487
export default function (mnemonic: string) {
  const seed = mnemonicToSeedSync(mnemonic)
  const { privateKey } = HDKey.fromMasterSeed(seed).derive(`m/44'/60'/0'/0/0`)
  return bytesToHex(privateKey!)
}
