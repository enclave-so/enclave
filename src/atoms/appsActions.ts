import { atom } from 'jotai'
import apps from 'atoms/apps'

// eslint-disable-next-line import/prefer-default-export
export const addApp = atom(null, (get, set, app: string) => {
  //TODO: understand why it rewrite the whole array //UPD: fixed?
  //TODO: limit to 128
  set(apps, [...get(apps), app])
})
