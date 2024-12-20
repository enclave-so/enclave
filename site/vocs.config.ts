import { defineConfig } from 'vocs'

export default defineConfig({
  title: 'Enclave',
  markdown: {
    code: {
      themes: {
        light: 'vitesse-light',
        dark: 'github-dark',
      },
    },
  },
  logoUrl: '/logo.svg',
  socials: [
    {
      icon: 'discord',
      link: 'https://discord.gg/haJ25keutP',
    },
    {
      icon: 'github',
      link: 'https://github.com/enclave-so/enclave',
    },
  ],
  sidebar: [
    // {
    //   text: 'Why Enclave',
    //   link: '/introduction',
    // },
    {
      text: 'Getting Started',
      link: '/getting-started',
    },
    {
      text: 'Embedded Wallet (wallet)',
      items: [
        {
          text: 'Overview',
          link: '/wallet/overview',
        },
        {
          text: 'Wagmi',
          link: '/wallet/wagmi',
        },
        {
          text: 'AppKit (Web3Modal)',
          link: '/wallet/appkit',
        },
        {
          text: 'ConnectKit',
          link: '/wallet/connectkit',
        },
        {
          text: 'RainbowKit',
          link: '/wallet/rainbowkit',
        },
        {
          text: 'Viem / Ethers / Web3.js',
          // link: '/integrations/viem-ethers-web3js',
          link: '/wallet/libraries',
        },
      ],
    },
    {
      text: 'Sponsored Transactions (sponsored)',
      link: '/sponsored/overview',
    },
    {
      text: 'Batched Transactions (batched)',
      link: '/batched',
    },
    {
      text: 'Tokens metadata (md)',
      link: '/md',
    },
    // {
    //   text: 'Legal & Policies',
    //   items: [
    //     {
    //       text: 'Terms of Service',
    //       link: '/other/tos',
    //     },
    //     {
    //       text: 'Privacy Policy',
    //       link: '/other/privacy',
    //     },
    //   ],
    // },
  ],
})
