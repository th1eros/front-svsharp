import { Outlet } from "react-router-dom";
// [CTO] ../ sai de 'layout' para acessar 'theme'
import { cyberColors } from "../theme/cyberColors"; 
// [CTO] ./ busca na mesma pasta 'layout'
import Sidebar from "./Sidebar"; 
import Navbar from "./Navbar"; 

/**
 * [CIO] Layout Central Integrado
 * Este arquivo é o "chassi" do seu sistema.
 */
export default function AdminLayout() {
  return (
    <div style={{ 
      display: "flex", 
      minHeight: "100vh", 
      backgroundColor: cyberColors.background,
      fontFamily: "'Inter', sans-serif",
      color: 'white'
    }}>
      
      {/* 🛡️ Inserindo a Sidebar na lateral esquerda */}
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        {/* Barra de Topo Utilitária */}
        <Navbar />

        {/* Área de Conteúdo Dinâmico */}
        <main style={{ 
          flex: 1, 
          padding: '40px', 
          overflowY: 'auto',
          background: `radial-gradient(circle at top right, ${cyberColors.card}44, transparent)`
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}