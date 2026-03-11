import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * [CTO] Configuração de Build Estratégica
 * Ajustada para o deploy oficial no GitHub Pages.
 */
export default defineConfig({
  plugins: [react()],
  
  // [IMPORTANTE] O base deve ser exatamente o nome final da sua URL no GitHub.
  // Se seu repo é 'svsharp-frontend', mantenha como abaixo:
  base: '/svsharp-frontend/', 

  build: {
    outDir: 'dist',
    // [CIO] Gera source maps para facilitar o debug, mas mantém os assets organizados
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})