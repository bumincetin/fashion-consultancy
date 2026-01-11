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
        // Plugin to generate _routes.json for Cloudflare Pages SPA routing
        {
          name: 'generate-routes',
          closeBundle() {
            // _routes.json is the modern Cloudflare Pages approach for SPA routing
            // "include" specifies which paths should be handled by the SPA
            // "exclude" specifies static assets that should be served directly
            const routesConfig = {
              version: 1,
              include: ["/*"],
              exclude: ["/assets/*", "/*.jpg", "/*.png", "/*.ico", "/*.svg", "/*.css", "/*.js"]
            };
            writeFileSync(
              path.resolve(__dirname, 'dist/_routes.json'), 
              JSON.stringify(routesConfig, null, 2)
            );
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
