import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: process.env.OPENAPI_JSON_URL ?? 'http://127.0.0.1:3001/docs-json',
  output: 'src/generated',
  plugins: ['@hey-api/typescript'],
})
