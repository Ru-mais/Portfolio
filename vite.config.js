import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true, // Allow local network access
    allowedHosts: true // Allow all tunnel providers (ngrok, localtunnel, etc.)
  }
});
