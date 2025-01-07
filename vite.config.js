import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    'process.env.DATABASE_USER': JSON.stringify(process.env.DATABASE_USER),
    'process.env.DATABASE_PASSWORD': JSON.stringify(process.env.DATABASE_PASSWORD),
    'process.env.DATABASE_HOST': JSON.stringify(process.env.DATABASE_HOST),
    'process.env.DATABASE_PORT': JSON.stringify(process.env.DATABASE_PORT),
    'process.env.DATABASE_SSL': JSON.stringify(process.env.DATABASE_SSL),
  },
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