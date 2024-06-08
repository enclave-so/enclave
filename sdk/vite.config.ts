import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import pkg from './package.json' assert { type: 'json' }

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      formats: ['es'], // pure ESM package
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies), // don't bundle dependencies
        /^node:.*/, // don't bundle built-in Node.js modules (use protocol imports!)
      ],
      output: {
        preserveModules: true,
        entryFileNames: ({ name: fileName }) => {
          return `${fileName}.js`
        },
      },
    },
    target: 'esnext', // transpile as little as possible
    sourcemap: true,
    minify: false,
  },
  plugins: [dts()], // emit TS declaration files
})

//TODO: add sideEffects to package.json (now we have global vars in the code)