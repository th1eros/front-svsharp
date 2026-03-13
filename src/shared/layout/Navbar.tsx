import { useNavigate } from 'react-router-dom';

/**
 * Navbar Utilitária
 * Implementa Blur (#060b19) e Transparência conforme guia visual.
 */
export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // [CISO] Encerramento de sessão e limpeza de tokens
    localStorage.removeItem("@SVSharp:token");
    navigate("/login");
  };

  return (
    <header style={{
      height: '64px',
      // [CTO] Cor Navy Blue com 70% de opacidade para efeito de transparência
      backgroundColor: 'rgba(6, 11, 25, 0.7)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #1e293b',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        
        {/* Indicadores de Status do Sistema */}
        <div style={{ display: 'flex', gap: '15px', marginRight: '20px', borderRight: '1px solid #1e293b', paddingRight: '20px' }}>
            <span title="Alerts" style={{ cursor: 'pointer', color: '#94a3b8' }}>🔔</span>
            <span title="Settings" style={{ cursor: 'pointer', color: '#94a3b8' }}>⚙️</span>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>Admin User</div>
          <div style={{ 
            color: '#2a9d8f', // Verde esmeralda da imagem (Low/Safe)
            fontSize: '11px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'flex-end', 
            gap: '5px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2a9d8f' }}></span>
            Connected
          </div>
        </div>
        
        {/* Acionador de Perfil e Logout */}
        <button 
          onClick={handleLogout}
          title="LOGOUT_SESSION"
          style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '12px', 
            background: 'linear-gradient(135deg, #0077b6 0%, #00b4d8 100%)',
            border: 'none', 
            cursor: 'pointer',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '18px', 
            boxShadow: '0 4px 15px rgba(0, 119, 182, 0.3)',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          👤
        </button>
      </div>
    </header>
  );
}