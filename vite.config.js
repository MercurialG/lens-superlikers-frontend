import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'

export default defineConfig(({ command, mode }) => ({
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin'
    },
    https: command === 'serve' && mode !== 'production'
      ? {
          key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
          cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem'))
        }
      : false
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  }
}))
