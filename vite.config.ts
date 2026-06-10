import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import istanbul from 'vite-plugin-istanbul';

export default defineConfig({
  base: './',
  resolve: {
    dedupe: ['react', 'react-dom']
  },
  build: {
    chunkSizeWarningLimit: 8000,
    sourcemap: true,
    rollupOptions: {
      external: ['/env.js'],
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  },
  plugins: [
    react(),
    viteTsconfigPaths(),
    // Istanbul instrumentation only during Cypress runs, not normal dev
    process.env.CYPRESS_COVERAGE === 'true' &&
      istanbul({
        include: 'src/**/*.{js,jsx,ts,tsx}',
        exclude: ['node_modules', 'tests/cypress/', '**/*.test.*', '**/*.cy.*'],
        extension: ['.js', '.jsx', '.ts', '.tsx'],
        cypress: true
      })
  ].filter(Boolean),
  server: {
    host: true,
    port: 8100
  }
});
