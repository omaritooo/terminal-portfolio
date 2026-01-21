import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint2';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    eslint({
      cache: false,
      include: ['./src/**/*.ts', './src/**/*.tsx', './src/**/*.jsx', './src/**/*.js'],
      exclude: [],
    }),
  ],
});
