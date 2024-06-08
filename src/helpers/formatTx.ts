import { RawTx, Tx } from 'models/Tx'
import { hexToBigInt, hexToNumber } from 'viem'

export default function (tx: RawTx): Tx {
  return {
    to: tx.to,
    from: tx.from,
    ...(tx.value && { value: hexToBigInt(tx.value) }), //bypass exactOptionalPropertyTypes
    ...(tx.nonce && { nonce: hexToNumber(tx.nonce) }),
    ...(tx.maxPriorityFeePerGas && {
      maxPriorityFeePerGas: hexToBigInt(tx.maxPriorityFeePerGas),
    }),
    ...(tx.maxFeePerGas && { maxFeePerGas: hexToBigInt(tx.maxFeePerGas) }),
    ...(tx.chainId && { chainId: hexToNumber(tx.chainId) }),
    // chainId: tx.chainId ? hexToNumber(tx.chainId) : chain().id,
    ...(tx.data && { data: tx.data }),
    ...(tx.gasPrice && { gasPrice: hexToBigInt(tx.gasPrice) }),
    ...(tx.gas && { gas: hexToBigInt(tx.gas) }),
  }
}
