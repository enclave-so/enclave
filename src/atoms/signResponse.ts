import { atom } from 'jotai'

export default atom<{
  id: string
  result: unknown
} | null>(null)
