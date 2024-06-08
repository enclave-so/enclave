import { mnemonicToAccount, privateKeyToAccount } from 'viem/accounts'
import isPrivateKey from 'helpers/isPrivateKey'

export default function (key: string) {
  const account = isPrivateKey(key)
    ? privateKeyToAccount(key as `0x${string}`)
    : mnemonicToAccount(key)
  return account
}
