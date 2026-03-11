import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { cyberColors } from '../shared/theme/cyberColors'; // Importando nosso tema unificado

/**
 * [CISO] Tela de Autenticação Unificada
 * Design inspirado na Link Tree do usuário, mantendo a estética "Access Granted".
 */
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // [CTO] Simulação de Login - Integrar com authService futuramente
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log('Tentativa de login:', { email });
    
    // Simula delay de rede e sucesso
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('svsharp_token', 'mock_token_granted');
      navigate('/dashboard'); // Redireciona para o chassi principal
    }, 1500);
  };

  // Estilos Compartilhados para manter consistência com a imagem de referência
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 15px',
    marginBottom: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Fundo escuro semi-transparente
    border: `1px solid ${cyberColors.border}`,
    borderRadius: '6px',
    color: cyberColors.text.primary,
    fontFamily: "'JetBrains Mono', monospace", // Fonte estilo terminal
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s',
  };

  const actionLinkStyle: React.CSSProperties = {
    color: cyberColors.text.secondary,
    textDecoration: 'none',
    fontSize: '12px',
    fontFamily: "'Inter', sans-serif",
    transition: 'color 0.3s',
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      backgroundColor: '#000000', // Preto absoluto da referência
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Inter', sans-serif",
    }}>
      
      {/* 🛡️ [Design] O Escudo Grande Transparente no Fundo */}
      <img 
        src="path_to_your_shield_logo.png" // Substitua pelo caminho real do logo
        alt="Shield Background"
        style={{
          position: 'absolute',
          width: '80%', // Grande, ocupando a maior parte da tela
          maxWidth: '800px',
          opacity: 0.06, // Muito transparente (6%)
          pointerEvents: 'none', // Não interfere nos cliques
          zIndex: 1,
        }}
      />

      {/* Container do Formulário - Com a borda neon da referência */}
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#050505', // Ligeiramente mais claro que o fundo
        padding: '40px',
        borderRadius: '12px',
        border: `1px solid ${cyberColors.status.online}`, // Borda neon ciano
        boxShadow: `0 0 20px ${cyberColors.status.online}33`, // Glow sutil ciano
        position: 'relative',
        zIndex: 10, // Acima do escudo de fundo
        textAlign: 'center',
      }}>
        
        {/* Branding Superior Minimalista */}
        <div style={{ 
          color: cyberColors.status.online, 
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '20px',
          fontWeight: 'bold',
          marginBottom: '10px',
          letterSpacing: '2px'
        }}>
          SVSHARP_OS
        </div>
        <div style={{ 
          color: cyberColors.text.secondary, 
          fontSize: '12px', 
          marginBottom: '40px',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          Secure Access Terminal
        </div>

        {/* Formulário de Login */}
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="SYSTEM_USER / EMAIL" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
            onFocus={(e) => e.currentTarget.style.borderColor = cyberColors.status.online}
            onBlur={(e) => e.currentTarget.style.borderColor = cyberColors.border}
          />
          
          <input 
            type="password" 
            placeholder="ACCESS_KEY / PASSWORD" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
            onFocus={(e) => e.currentTarget.style.borderColor = cyberColors.status.online}
            onBlur={(e) => e.currentTarget.style.borderColor = cyberColors.border}
          />

          {/* Botão de Ação Principal - Estilo idêntico ao da referência */}
          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: 'transparent',
              border: `2px solid ${cyberColors.status.online}`,
              borderRadius: '8px',
              color: cyberColors.status.online,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '14px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              boxShadow: `0 0 10px ${cyberColors.status.online}22`,
              marginBottom: '25px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
            onMouseOver={(e) => {
              if(!loading) {
                e.currentTarget.style.backgroundColor = `${cyberColors.status.online}11`;
                e.currentTarget.style.boxShadow = `0 0 20px ${cyberColors.status.online}55`;
              }
            }}
            onMouseOut={(e) => {
              if(!loading) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.boxShadow = `0 0 10px ${cyberColors.status.online}22`;
              }
            }}
          >
            {loading ? 'Authenticating...' : '> Initialize Session'}
          </button>
        </form>

        {/* [CISO] Links de Ação Secundária (Registrar e Esqueci) */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderTop: `1px solid ${cyberColors.border}`,
          paddingTop: '20px'
        }}>
          <Link 
            to="/register" 
            style={actionLinkStyle}
            onMouseOver={(e) => e.currentTarget.style.color = cyberColors.text.primary}
            onMouseOut={(e) => e.currentTarget.style.color = cyberColors.text.secondary}
          >
            [ Create Account ]
          </Link>
          
          <Link 
            to="/forgot-password" 
            style={actionLinkStyle}
            onMouseOver={(e) => e.currentTarget.style.color = cyberColors.status.offline} // Destaque em vermelho sutil
            onMouseOut={(e) => e.currentTarget.style.color = cyberColors.text.secondary}
          >
            Forgot Key?
          </Link>
        </div>

        {/* Footer Minimalista (referência à session date da imagem) */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: 0,
          width: '100%',
          fontSize: '10px',
          color: 'rgba(255,255,255,0.1)',
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          [SYS_STATUS: AWAITING_AUTH] - v1.0.2
        </div>
      </div>
    </div>
  );
}