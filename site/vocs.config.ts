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
      text: 'Integrations',
      items: [
        {
          text: 'Wagmi',
          link: '/integrations/wagmi',
        },
        {
          text: 'AppKit (Web3Modal)',
          link: '/integrations/appkit',
        },
        {
          text: 'ConnectKit',
          link: '/integrations/connectkit',
        },
        {
          text: 'RainbowKit',
          link: '/integrations/rainbowkit',
        },
        {
          text: 'Viem / Ethers / Web3.js',
          // link: '/integrations/viem-ethers-web3js',
          link: '/integrations/libraries',
        },
      ],
    },
    {
      text: 'Plus',
      items: [
        {
          text: 'Boosts',
          link: '/plus/boosts',
        },
      ],
    },
    {
      text: 'Legal & Policies',
      items: [
        {
          text: 'Terms of Service',
          link: '/other/tos',
        },
        {
          text: 'Privacy Policy',
          link: '/other/privacy',
        },
      ],
    },
  ],
})
