import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    // تغییر به ./ برای دامنه شخصی (ریشه سایت)
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    // اطمینان از اینکه پوشه public به درستی کپی می‌شود
    publicDir: 'public',
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
    },
  };
});