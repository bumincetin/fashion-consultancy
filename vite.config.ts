import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { writeFileSync } from 'fs';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
          '/api': {
            target: 'http://localhost:3001',
            changeOrigin: true,
            secure: false
          }
        }
      },
      plugins: [
        react(),
        // Plugin to generate correct _redirects file for Cloudflare Pages
        {
          name: 'generate-redirects',
          closeBundle() {
            // Cloudflare Pages _redirects format: /from /to status_code
            // Important: Order matters - more specific rules first
            // Use 200 status for rewrites (SPA routing without URL change)
            const redirectsContent = `/assets/* /assets/* 200
/tr /index.html 200
/it /index.html 200
/en /index.html 200
/* /index.html 200
`;
            writeFileSync(path.resolve(__dirname, 'dist/_redirects'), redirectsContent);
          }
        }
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
