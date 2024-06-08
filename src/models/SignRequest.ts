import { Hex } from 'viem'
import { RawTx } from 'models/Tx'

type SignPayload =
  | { method: 'personal_sign'; message: Hex }
  | { method: 'eth_signTypedData_v4'; data: string }
  | {
      method: 'eth_signTransaction'
      chainId: number
      rawTx: RawTx
    }
  | {
      method: 'eth_sendTransaction'
      chainId: number
      rawTx: RawTx
    }

type SignRequest = {
  id: string
  wallet: Hex
  app: string
  //TODO: add createdAt
} & SignPayload

export type { SignPayload }
export default SignRequest
