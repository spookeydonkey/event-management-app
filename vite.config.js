import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
    server: {
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      '@style': path.resolve(__dirname, './src/style'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      // Add other aliases as needed
    },
  },
});
