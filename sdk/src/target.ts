import logo from './logo'
import { provider } from './provider'

const target = {
  icon: logo as `data:image/${string}`,
  id: 'enclave',
  name: 'Enclave',
  provider: provider,
}

const targetWithBadge = { ...target, name: `${target.name} (built-in)` }

export { target, targetWithBadge }
