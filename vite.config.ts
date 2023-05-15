import { resolve } from 'pathe';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      // @ts-ignore or install @types/node
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'tron-connect',
      // the proper extensions will be added
      fileName: 'tron-connect',
      formats: ['es', 'umd', 'cjs'],
    },
  },
  plugins: [
    eslint({
      fix: true,
      include: ['src/**/*.ts'],
      exclude: ['node_modules/**', 'dist/**'],
    }),
  ],
});
