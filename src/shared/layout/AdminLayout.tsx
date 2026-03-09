import { Outlet, Link, useLocation } from "react-router-dom";
import { cyberColors } from "../theme/cyberColors";

export default function AdminLayout() {
  const location = useLocation();

  const linkStyle = (path: string) => ({
    color: location.pathname === path ? '#3B82F6' : 'white',
    textDecoration: 'none',
    padding: '10px',
    borderRadius: '4px',
    backgroundColor: location.pathname === path ? '#1E293B' : 'transparent',
    transition: '0.3s'
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: cyberColors.background }}>
      
      {/* Sidebar Dark Cyber */}
      <aside style={{
          width: "240px",
          background: "#162031",
          color: "white",
          padding: "25px",
          borderRight: `1px solid ${cyberColors.border}`
        }}
      >
        <h2 style={{ color: '#3B82F6', marginBottom: '30px' }}>🛡️ SVSharp</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          <Link to="/dashboard" style={linkStyle('/dashboard')}>📊 Dashboard</Link>
          <Link to="/assets" style={linkStyle('/assets')}>🖥️ Assets</Link>
          <Link to="/vulnerabilities" style={linkStyle('/vulnerabilities')}>⚠️ Vulnerabilities</Link>
          
          <button 
            onClick={() => { localStorage.clear(); window.location.href = '/login'; }}
            style={{ marginTop: '50px', background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', textAlign: 'left' }}
          >
            🚪 Sair do Sistema
          </button>
        </nav>
      </aside>

      {/* Conteúdo dinâmico */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
}