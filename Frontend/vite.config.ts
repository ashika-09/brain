import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Replace with your desired port
    strictPort: true, // Fail if the port is already in use
    host: 'localhost', // Change to '0.0.0.0' if you want external devices to access
    open: true, // Automatically open the browser
  },
  build: {
    outDir: 'dist', // Ensure the output folder is named correctly
  },
  resolve: {
    alias: {
      // Add any necessary path aliases
    },
  },
  base: './', // This ensures the assets are loaded relative to the current path
});

