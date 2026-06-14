import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Removed exclude to allow lucide-react pre-bundling
  server: {
    port: 3000,
  },
});
