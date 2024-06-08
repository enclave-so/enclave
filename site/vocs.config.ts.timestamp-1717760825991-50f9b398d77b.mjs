// vocs.config.ts
import { defineConfig } from "file:///Users/phantoms/work/dev/pareo/site/node_modules/.pnpm/vocs@1.0.0-alpha.50_@types+react@18.3.2_react-dom@18.3.1_react@18.3.1_rollup@4.17.2_typescript@5.4.5/node_modules/vocs/_lib/index.js";
var vocs_config_default = defineConfig({
  title: "Enclave",
  markdown: {
    code: {
      themes: {
        light: "vitesse-light",
        dark: "github-dark"
      }
    }
  },
  logoUrl: "/logo.svg",
  sidebar: [
    // {
    //   text: 'Why Enclave',
    //   link: '/introduction',
    // },
    {
      text: "Getting Started",
      link: "/getting-started"
    },
    {
      text: "Integrations",
      items: [
        {
          text: "Wagmi",
          link: "/integrations/wagmi"
        },
        {
          text: "Web3Modal",
          link: "/integrations/web3modal"
        },
        {
          text: "ConnectKit",
          link: "/integrations/connectkit"
        },
        {
          text: "RainbowKit",
          link: "/integrations/rainbowkit"
        },
        {
          text: "Viem / Ethers / Web3.js",
          // link: '/integrations/viem-ethers-web3js',
          link: "/integrations/libraries"
        }
        // {
        //   text: 'Viem',
        //   link: '/integrations/viem',
        // },
        // {
        //   text: 'Ethers',
        //   link: '/integrations/ethers',
        // },
        // {
        //   text: 'Web3.js',
        //   link: '/integrations/web3js',
        // }
      ]
    },
    {
      text: "Plus",
      items: [
        {
          text: "Boosts",
          link: "/plus/boosts"
        }
      ]
    },
    {
      text: "Legal & Policies",
      items: [
        {
          text: "Terms of Service",
          link: "/other/tos"
        },
        {
          text: "Privacy Policy",
          link: "/other/privacy"
        }
      ]
    }
  ]
});
export {
  vocs_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidm9jcy5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvcGhhbnRvbXMvd29yay9kZXYvcGFyZW8vc2l0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3BoYW50b21zL3dvcmsvZGV2L3BhcmVvL3NpdGUvdm9jcy5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3BoYW50b21zL3dvcmsvZGV2L3BhcmVvL3NpdGUvdm9jcy5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2b2NzJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICB0aXRsZTogJ0VuY2xhdmUnLFxuICBtYXJrZG93bjoge1xuICAgIGNvZGU6IHtcbiAgICAgIHRoZW1lczoge1xuICAgICAgICBsaWdodDogJ3ZpdGVzc2UtbGlnaHQnLFxuICAgICAgICBkYXJrOiAnZ2l0aHViLWRhcmsnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBsb2dvVXJsOiAnL2xvZ28uc3ZnJyxcbiAgc2lkZWJhcjogW1xuICAgIC8vIHtcbiAgICAvLyAgIHRleHQ6ICdXaHkgRW5jbGF2ZScsXG4gICAgLy8gICBsaW5rOiAnL2ludHJvZHVjdGlvbicsXG4gICAgLy8gfSxcbiAgICB7XG4gICAgICB0ZXh0OiAnR2V0dGluZyBTdGFydGVkJyxcbiAgICAgIGxpbms6ICcvZ2V0dGluZy1zdGFydGVkJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdJbnRlZ3JhdGlvbnMnLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdXYWdtaScsXG4gICAgICAgICAgbGluazogJy9pbnRlZ3JhdGlvbnMvd2FnbWknLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ1dlYjNNb2RhbCcsXG4gICAgICAgICAgbGluazogJy9pbnRlZ3JhdGlvbnMvd2ViM21vZGFsJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdDb25uZWN0S2l0JyxcbiAgICAgICAgICBsaW5rOiAnL2ludGVncmF0aW9ucy9jb25uZWN0a2l0JyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdSYWluYm93S2l0JyxcbiAgICAgICAgICBsaW5rOiAnL2ludGVncmF0aW9ucy9yYWluYm93a2l0JyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdWaWVtIC8gRXRoZXJzIC8gV2ViMy5qcycsXG4gICAgICAgICAgLy8gbGluazogJy9pbnRlZ3JhdGlvbnMvdmllbS1ldGhlcnMtd2ViM2pzJyxcbiAgICAgICAgICBsaW5rOiAnL2ludGVncmF0aW9ucy9saWJyYXJpZXMnLFxuICAgICAgICB9LFxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgdGV4dDogJ1ZpZW0nLFxuICAgICAgICAvLyAgIGxpbms6ICcvaW50ZWdyYXRpb25zL3ZpZW0nLFxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgdGV4dDogJ0V0aGVycycsXG4gICAgICAgIC8vICAgbGluazogJy9pbnRlZ3JhdGlvbnMvZXRoZXJzJyxcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgIHRleHQ6ICdXZWIzLmpzJyxcbiAgICAgICAgLy8gICBsaW5rOiAnL2ludGVncmF0aW9ucy93ZWIzanMnLFxuICAgICAgICAvLyB9XG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogJ1BsdXMnLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdCb29zdHMnLFxuICAgICAgICAgIGxpbms6ICcvcGx1cy9ib29zdHMnLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdMZWdhbCAmIFBvbGljaWVzJyxcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnVGVybXMgb2YgU2VydmljZScsXG4gICAgICAgICAgbGluazogJy9vdGhlci90b3MnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ1ByaXZhY3kgUG9saWN5JyxcbiAgICAgICAgICBsaW5rOiAnL290aGVyL3ByaXZhY3knLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICBdLFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMlIsU0FBUyxvQkFBb0I7QUFFeFQsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsT0FBTztBQUFBLEVBQ1AsVUFBVTtBQUFBLElBQ1IsTUFBTTtBQUFBLE1BQ0osUUFBUTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsTUFBTTtBQUFBLE1BQ1I7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLEVBQ1QsU0FBUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFLUDtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTDtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUE7QUFBQSxVQUVOLE1BQU07QUFBQSxRQUNSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFhRjtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTDtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
