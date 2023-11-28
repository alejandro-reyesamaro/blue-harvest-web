import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import vue from '@vitejs/plugin-vue'
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    basicSsl(),
    quasar({
      sassVariables: "src/assets/styles/quasar-variables.scss",
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: "localhost",
    https: {
      pfx: "./localhost.pfx",
      passphrase: "localhost",
    },
    port: 44340,
  },
})
