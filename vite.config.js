import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import removeConsole from 'vite-plugin-remove-console';
import path from 'path';

// Determine the base path based on deployment target
// - Vercel: '/' (root)
// - GitHub Pages: '/nexus-geom-lab/'
// - Local dev: '/'
const getBase = () => {
  if (process.env.VERCEL) return '/';
  if (process.env.NODE_ENV === 'production') return '/nexus-geom-lab/';
  return '/';
};

// Determine output directory
// - Vercel: 'dist'
// - GitHub Pages: 'docs'
const getOutDir = () => {
  if (process.env.VERCEL) return 'dist';
  return 'docs';
};

export default defineConfig({
  base: getBase(),
  plugins: [
    react(),
    removeConsole({
      // Only remove in production builds
      includes: ['log', 'warn', 'info', 'debug'],
      // Keep console.error for error tracking
      excludes: ['error'],
    }),
  ],
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: ``,
      },
    },
  },
  build: {
    outDir: getOutDir(),
    cssMinify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@features': path.resolve(__dirname, './src/features'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@context': path.resolve(__dirname, './src/context'),
      '@services': path.resolve(__dirname, './src/services'),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      // Forward API calls to the backend to avoid CORS in development
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true,
      },
    },
  },
});
