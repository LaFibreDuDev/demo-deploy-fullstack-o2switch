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
        external: ['express'], 
        output: {
            format: 'cjs', 
            entryFileNames: '[name].cjs',
        },
    },
  },
});