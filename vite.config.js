import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['express'],
  },
  build: {
    outDir: 'dist', 
    lib: {
        entry: ['src/server.js', 'src/models/reset.js'], 
        formats: ['cjs'], 
    },
    rollupOptions: {
        external: [
          'node:util',
          'node:crypto',
          'express',
          'cookie-parser',
          'jsonwebtoken',
          'jwt-decode',
          'sequelize',
          'pg',
          'pg-hstore',
          'zod',
          'swagger-jsdoc',
          'swagger-ui-express',
          'dotenv'
        ],
        output: {
            format: 'cjs', 
            entryFileNames: '[name].cjs',
        },
    },
  },
});