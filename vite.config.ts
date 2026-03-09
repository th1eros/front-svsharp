import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANTE: O 'base' deve ser exatamente o nome do seu repositório no GitHub entre barras
  base: '/front-svsharp/', 
  build: {
    // Garante que o build gere arquivos limpos para o GitHub Pages
    outDir: 'dist',
  }
})