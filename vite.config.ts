/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    // The Edge Function's pure modules live outside src because the Supabase
    // CLI only bundles what sits under supabase/functions/. They are still the
    // product, so they are still held to the suite.
    include: [
      'src/**/*.{test,spec}.{ts,tsx}',
      'supabase/functions/_shared/*.{test,spec}.ts',
    ],
    // Integration tests drive multi-step forms through the real router.
    testTimeout: 15_000,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.{test,spec}.{ts,tsx}',
        'src/test/**',
        'src/main.tsx',
        'src/**/*.d.ts',
      ],
      thresholds: {
        // The domain layer is the product; it is held to a far higher bar
        // than presentational code. See docs/superpowers/specs.
        'src/domain/**': { statements: 100, branches: 95, functions: 100, lines: 100 },
        statements: 80,
        branches: 75,
        functions: 80,
        lines: 80,
      },
    },
  },
})
