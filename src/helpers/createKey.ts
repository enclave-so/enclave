import { english, generateMnemonic } from 'viem/accounts'

export default function () {
  return generateMnemonic(english)
}
