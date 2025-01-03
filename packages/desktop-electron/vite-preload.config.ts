import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  publicDir: false,
  build: {
    outDir: 'dist/preload',
    ssr: true,
    target: 'node22',
    rollupOptions: {
      output: {
        format: 'commonjs',
      },
      input: {
        preload: 'src/preload/preload.ts',
      },
    },
  },
});
