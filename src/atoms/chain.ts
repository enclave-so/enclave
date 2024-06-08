import { atom } from 'jotai'
import chainId from 'atoms/chainId'
import getChain from 'helpers/getChain'

export default atom((get) => getChain(get(chainId)))
