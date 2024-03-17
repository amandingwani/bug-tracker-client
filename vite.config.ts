import { join } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: join(process.cwd(), 'src/$1'),
      },
    ],
  },
  server: {
    port: 5173,
  },
  preview: {
    port: 5173,
  },
});
