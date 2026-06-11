import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'happy-dom',
      include: ['tests/vitest/**/*.test.{ts,tsx}'],
      setupFiles: ['src/setupTests.ts'],
      includeTaskLocation: true,
      server: {
        deps: {
          inline: ['@mui/material']
        }
      },
      coverage: {
        enabled: true,
        provider: 'istanbul',
        reportOnFailure: true,
        reporter: [['cobertura', { file: 'unit-coverage.xml' }], 'lcov', 'text', 'json', 'html'],
        reportsDirectory: 'build/coverage',
        include: ['src/**/*.{ts,tsx}'],
        exclude: ['src/main.tsx', 'src/env.ts', '**/__mocks__/**']
      },
      exclude: ['node_modules/**']
    }
  })
);
