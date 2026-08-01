import { defineConfig } from 'vite';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // shadcn components are generated with @/ imports, and keeping the alias
    // means a component copied from the docs works without editing its imports.
    alias: { '@': path.resolve(import.meta.dirname, 'src') }
  },
  server: {
    port: 3000
  }
});
