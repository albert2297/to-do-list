import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
    '@': resolve(__dirname, './src')
    },
  },
  test: {
    globals: true,
    setupFiles: './src/setupTests.ts',
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
})
