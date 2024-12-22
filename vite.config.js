import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['express'],
  },
  build: {
    outDir: 'dist', 
    lib: {
        entry: 'src/server.js', 
        formats: ['cjs'], 
    },
    rollupOptions: {
        external: [
          'node:util',
          'express',
          'cookie-parser',
          'jsonwebtoken',
          'jwt-decode',
          'sequelize',
          'sqlite3',
          'zod',
        ],
        output: {
            format: 'cjs', 
            entryFileNames: '[name].cjs',
        },
    },
  },
});