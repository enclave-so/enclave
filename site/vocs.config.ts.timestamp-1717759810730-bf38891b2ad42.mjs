// vocs.config.ts
import { defineConfig } from "file:///Users/phantoms/work/dev/pareo/site/node_modules/.pnpm/vocs@1.0.0-alpha.50_@types+react@18.3.2_react-dom@18.3.1_react@18.3.1_rollup@4.17.2_typescript@5.4.5/node_modules/vocs/_lib/index.js";
var vocs_config_default = defineConfig({
  title: "Enclave",
  markdown: {
    code: {
      themes: {
        light: "vitesse-light",
        dark: "poimandres"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidm9jcy5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvcGhhbnRvbXMvd29yay9kZXYvcGFyZW8vc2l0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3BoYW50b21zL3dvcmsvZGV2L3BhcmVvL3NpdGUvdm9jcy5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3BoYW50b21zL3dvcmsvZGV2L3BhcmVvL3NpdGUvdm9jcy5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2b2NzJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICB0aXRsZTogJ0VuY2xhdmUnLFxuICBtYXJrZG93bjoge1xuICAgIGNvZGU6IHtcbiAgICAgIHRoZW1lczoge1xuICAgICAgICBsaWdodDogJ3ZpdGVzc2UtbGlnaHQnLFxuICAgICAgICBkYXJrOiAncG9pbWFuZHJlcycsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIGxvZ29Vcmw6ICcvbG9nby5zdmcnLFxuICBzaWRlYmFyOiBbXG4gICAgLy8ge1xuICAgIC8vICAgdGV4dDogJ1doeSBFbmNsYXZlJyxcbiAgICAvLyAgIGxpbms6ICcvaW50cm9kdWN0aW9uJyxcbiAgICAvLyB9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdHZXR0aW5nIFN0YXJ0ZWQnLFxuICAgICAgbGluazogJy9nZXR0aW5nLXN0YXJ0ZWQnLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogJ0ludGVncmF0aW9ucycsXG4gICAgICBpdGVtczogW1xuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ1dhZ21pJyxcbiAgICAgICAgICBsaW5rOiAnL2ludGVncmF0aW9ucy93YWdtaScsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnV2ViM01vZGFsJyxcbiAgICAgICAgICBsaW5rOiAnL2ludGVncmF0aW9ucy93ZWIzbW9kYWwnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ0Nvbm5lY3RLaXQnLFxuICAgICAgICAgIGxpbms6ICcvaW50ZWdyYXRpb25zL2Nvbm5lY3RraXQnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ1JhaW5ib3dLaXQnLFxuICAgICAgICAgIGxpbms6ICcvaW50ZWdyYXRpb25zL3JhaW5ib3draXQnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ1ZpZW0gLyBFdGhlcnMgLyBXZWIzLmpzJyxcbiAgICAgICAgICAvLyBsaW5rOiAnL2ludGVncmF0aW9ucy92aWVtLWV0aGVycy13ZWIzanMnLFxuICAgICAgICAgIGxpbms6ICcvaW50ZWdyYXRpb25zL2xpYnJhcmllcycsXG4gICAgICAgIH0sXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICB0ZXh0OiAnVmllbScsXG4gICAgICAgIC8vICAgbGluazogJy9pbnRlZ3JhdGlvbnMvdmllbScsXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICB0ZXh0OiAnRXRoZXJzJyxcbiAgICAgICAgLy8gICBsaW5rOiAnL2ludGVncmF0aW9ucy9ldGhlcnMnLFxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgdGV4dDogJ1dlYjMuanMnLFxuICAgICAgICAvLyAgIGxpbms6ICcvaW50ZWdyYXRpb25zL3dlYjNqcycsXG4gICAgICAgIC8vIH1cbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiAnUGx1cycsXG4gICAgICBpdGVtczogW1xuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ0Jvb3N0cycsXG4gICAgICAgICAgbGluazogJy9wbHVzL2Jvb3N0cycsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogJ0xlZ2FsICYgUG9saWNpZXMnLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdUZXJtcyBvZiBTZXJ2aWNlJyxcbiAgICAgICAgICBsaW5rOiAnL290aGVyL3RvcycsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnUHJpdmFjeSBQb2xpY3knLFxuICAgICAgICAgIGxpbms6ICcvb3RoZXIvcHJpdmFjeScsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gIF0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyUixTQUFTLG9CQUFvQjtBQUV4VCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsRUFDUCxVQUFVO0FBQUEsSUFDUixNQUFNO0FBQUEsTUFDSixRQUFRO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsTUFDUjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsRUFDVCxTQUFTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUtQO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQTtBQUFBLFVBRU4sTUFBTTtBQUFBLFFBQ1I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQWFGO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0w7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
