import { Handlers } from 'transport/v1'

type Method = 'eth_requestAccounts'
// eslint-disable-next-line import/prefer-default-export
export const handlers: Handlers<Method> = {
  ['eth_requestAccounts']: requestAccounts,
}

function requestAccounts() {
  return ['0x27Bdc0241FacE372d97eDB4466Ae247022Dbf0D3']
}
