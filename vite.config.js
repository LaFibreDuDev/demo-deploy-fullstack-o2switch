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
          'pg',
          'pg-hstore',
          'zod',
          'swagger-jsdoc',
          'swagger-ui-express'
        ],
        output: {
            format: 'cjs', 
            entryFileNames: '[name].cjs',
        },
    },
  },
});