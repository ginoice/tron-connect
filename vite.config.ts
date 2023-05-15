import { resolve } from 'pathe'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      // @ts-ignore or install @types/node
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'tron-connect',
      // the proper extensions will be added
      fileName: 'tron-connect',
      formats: ['es', 'umd', "cjs"],
    },
  },
})

