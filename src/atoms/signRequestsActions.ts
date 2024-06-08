import { atom } from 'jotai'
import SignRequest from 'models/SignRequest'
import signRequests from 'atoms/signRequests'

export const addSignRequest = atom(
  null,
  (get, set, signRequest: SignRequest) => {
    set(signRequests, [...get(signRequests), signRequest])
  }
)

export const removeSignRequest = atom(null, (get, set, id: string) => {
  set(
    signRequests,
    get(signRequests).filter((r) => r.id !== id)
  )
})
