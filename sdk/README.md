# Enclave

Enclave is an embedded Web3 wallet for user onboarding.

[Getting Started](https://docs.enclave.so/getting-started) | [Demo](https://demo.enclave.so) | [Wallet](https://wallet.enclave.so)

- 3-lines setup (1 in terminal, 2 in code)
- Integrates with any library ([Wagmi](https://docs.enclave.so/integrations/wagmi), [Web3Modal](https://docs.enclave.so/integrations/appkit), [Ethers](https://docs.enclave.so/integrations/libraries), etc.)
- Allows users to sign messages, send transactions, and interact with smart contracts
- Free to use, with no limits or project ID required
- [Boost](https://docs.enclave.so/plus/boosts) feature to increase user engagement

... and much more.

## Overview

```sh
npm i @enclave-so/sdk
```

```ts
import { provider } from '@enclave-so/sdk'

provider.announce() // EIP-6963 announce

const accounts = await provider.request({ method: 'eth_requestAccounts' }) // EIP-1193 provider
console.log(accounts)
// ['0x6B944948B5e70e4421034C4C0744A176b0bf9968']
```

## Links

- [Visit the documentation](https://docs.enclave.so/getting-started) to learn more about Enclave.
- Follow [@enclave_so](https://twitter.com/enclave_so) and [@danpopenko](https://twitter.com/danpopenko) on Twitter for project updates
- Join the [discussions on GitHub](https://github.com/enclave-so/enclave/discussions)
- [Share your project/organization](https://github.com/enclave-so/enclave/discussions/104) that uses Enclave

## License

[MIT](/LICENSE) License
