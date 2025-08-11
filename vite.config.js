import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true,
    allowedHosts: ['eccellenza.rw'],
    hmr: { host: 'eccellenza.rw' },
  }
});