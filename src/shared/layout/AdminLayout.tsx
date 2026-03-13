import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; 
import Navbar from "./Navbar"; 

/**
 * Layout principal com Sidebar fixa e Navbar dinâmica.
 * Implementa a paleta Deep Sea (#060b19) conforme guia visual.
 */
export default function AdminLayout() {
  return (
    <div style={{ 
      display: "flex", 
      minHeight: "100vh", 
      backgroundColor: "#060b19", 
      fontFamily: "'Inter', sans-serif",
      color: 'white',
      overflow: 'hidden'
    }}>
      
      <Sidebar />

      <div style={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "column",
        marginLeft: '260px', // Compensação da Sidebar fixa
        height: '100vh'
      }}>
        
        <Navbar />

        <main style={{ 
          flex: 1, 
          padding: '30px', 
          overflowY: 'auto',
          // Gradiente radial para simular profundidade da imagem de referência
          background: `radial-gradient(circle at 50% 50%, #0a1227 0%, #060b19 100%)`,
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
             <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}