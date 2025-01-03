import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 1234,
  },
  base: './',
  build: {
    outDir: 'dist/renderer',
    rollupOptions: {
      input: {
        entry: 'src/renderer/main.tsx',
        html: 'index.html',
      },
    },
  },
});
