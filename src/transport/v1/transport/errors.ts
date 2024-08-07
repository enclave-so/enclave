/* eslint-disable @typescript-eslint/no-explicit-any */
type ErrMessage =
  | 'Parse error'
  | 'Invalid request'
  | 'Method not found'
  | 'Invalid params'
  | 'Internal error'
  | 'Invalid input'
  | 'Resource not found'
  | 'Resource unavailable'
  | 'Transaction rejected'
  | 'Method not supported'
  | 'Limit exceeded'
  | 'JSON-RPC version not supported'

const ErrMap: Record<ErrMessage, number> = {
  'Parse error': -32700,
  'Invalid request': -32600,
  'Method not found': -32601,
  'Invalid params': -32602,
  'Internal error': -32603,
  'Invalid input': -32000,
  'Resource not found': -32001,
  'Resource unavailable': -32002,
  'Transaction rejected': -32003,
  'Method not supported': -32004,
  'Limit exceeded': -32005,
  'JSON-RPC version not supported': -32006,
}

type Err = {
  code: number
  message: string
  data?: any
}

function createErr(message: ErrMessage, data?: any): Err {
  const code = ErrMap[message]
  return { code, message, data }
}

function isErr(value: any): value is Err {
  return (
    value && typeof value.code === 'number' && typeof value.message === 'string'
  )
}

export type { Err }
export { createErr, isErr }
