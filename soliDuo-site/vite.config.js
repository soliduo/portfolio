import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',       // nome EXATO do repositório
  build: { outDir: 'docs' }, // build vai para /docs
})
