import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  publicDir: false,
  build: {
    outDir: 'dist/main',
    ssr: true,
    target: 'node22',
    rollupOptions: {
      output: {
        format: 'esm',
      },
      input: {
        main: 'src/main/main.ts',
      },
    },
  },
});
