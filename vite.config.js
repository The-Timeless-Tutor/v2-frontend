import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
      // Allows for `import '@/*'` to work according to shadcn docs
      {
        find: /^@\//,
        replacement: path.join(process.cwd(), 'src/'),
      },
    ],
  },
  server: {
    port: 3030,
  },
  preview: {
    port: 3030,
  },
});
