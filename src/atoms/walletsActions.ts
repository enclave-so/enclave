import { Hex } from 'viem'
import { atom } from 'jotai'
import { marshal } from 'helpers/secret'
import getAccount from 'helpers/getAccount'
import isPrivateKey from 'helpers/isPrivateKey'
import wallets from 'atoms/wallets'

export const addWallet = atom(null, async (get, set, key: string) => {
  const address = getAccount(key).address
  const isPK = isPrivateKey(key)
  let w = get(wallets)
  const isExist = w.find((w) => w.address === address)
  //TODO: refactor this
  if (!isPK) {
    //if its seed we nedd to delete all other accounts with same address
    w = w.filter((w) => w.address !== address)
  }
  const encryptedKey = await marshal(key)
  if (!isExist || !isPK) {
    w = [{ address, key: encryptedKey }, ...w] //add to the top
  }
  set(wallets, w)
})

export const removeWallet = atom(null, (get, set, address: Hex) => {
  set(
    wallets,
    get(wallets).filter((w) => w.address !== address)
  )
})

export const switchWallet = atom(null, (get, set, address: Hex) => {
  set(
    wallets,
    [...get(wallets)].sort((w) => (w.address === address ? -1 : 1))
  )
})

export const findWallet = atom(
  (get) => (address: Hex) => get(wallets).find((w) => w.address === address)
)
