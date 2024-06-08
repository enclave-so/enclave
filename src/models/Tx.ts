import { Hex } from 'viem'

interface RawTx {
  to: Hex
  from: Hex
  value?: Hex
  nonce?: Hex
  maxPriorityFeePerGas?: Hex
  maxFeePerGas?: Hex
  chainId?: Hex
  data?: Hex
  gasPrice?: Hex
  gas?: Hex
}

interface Tx {
  to: Hex
  from: Hex
  value?: bigint
  nonce?: number
  maxPriorityFeePerGas?: bigint
  maxFeePerGas?: bigint
  chainId?: number
  data?: Hex
  gasPrice?: bigint
  gas?: bigint
}

export type { Tx, RawTx }
