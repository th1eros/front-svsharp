import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'

/**
 * [CIO] Inicialização do Sistema
 * O HashRouter com basename garante que as rotas funcionem 
 * dentro da subpasta /svsharp-frontend/ no GitHub Pages.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter basename="/svsharp-frontend">
      <App />
    </HashRouter>
  </React.StrictMode>,
)