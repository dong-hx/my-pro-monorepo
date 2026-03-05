import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(({ mode }) => {
  const isStaging = mode === 'staging'
  const isProduction = mode === 'production'
  const enableSourceMap = isStaging || isProduction

  return {
    plugins: [tailwindcss(), react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      sourcemap: enableSourceMap,
    },
    preview: {
      port: 3000,
      strictPort: true,
    },
  }
})
