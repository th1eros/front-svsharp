import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api'; 
import { cyberColors } from '../shared/theme/cyberColors';

/**
 * [CISO] Tela de Autenticação Unificada - Integrada com API e Path Corrigido
 */
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // [CTO] Função de Login Real conectada ao Back-end
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Explicação para o estagiário: Enviamos os dados para o back-end.
      // O interceptor no api.ts cuidará de anexar o token nas próximas chamadas.
      const response = await api.post('/sessions', {
        email,
        password,
      });

      const { token } = response.data;

      // Salvamos o token com a chave padrão do sistema
      localStorage.setItem('@SVSharp:token', token);
      
      console.log('✅ Acesso concedido. Redirecionando...');
      navigate('/dashboard');

    } catch (error: any) {
      console.error('❌ Erro na autenticação:', error);
      alert(error.response?.data?.message || 'Falha no acesso: Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 15px',
    marginBottom: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    border: `1px solid ${cyberColors.border}`,
    borderRadius: '6px',
    color: cyberColors.text.primary,
    fontFamily: "'JetBrains Mono', monospace",
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
      height: '100vh', width: '100vw', backgroundColor: '#000000',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', fontFamily: "'Inter', sans-serif",
    }}>
      
      {/* 🛡️ Background Logo - Alterado para "./" para funcionar no GitHub Pages */}
      <img 
        src="./shield_logo.png" 
        alt="Shield Background"
        style={{
          position: 'absolute', width: '80%', maxWidth: '800px',
          opacity: 0.06, pointerEvents: 'none', zIndex: 1,
        }}
      />

      <div style={{
        width: '100%', maxWidth: '400px', backgroundColor: '#050505',
        padding: '40px', borderRadius: '12px', border: `1px solid ${cyberColors.status.online}`,
        boxShadow: `0 0 20px ${cyberColors.status.online}33`, position: 'relative', zIndex: 10, textAlign: 'center',
      }}>
        
        <div style={{ 
          color: cyberColors.status.online, fontFamily: "'JetBrains Mono', monospace",
          fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', letterSpacing: '2px'
        }}>
          SVSHARP_OS
        </div>
        <div style={{ 
          color: cyberColors.text.secondary, fontSize: '12px', marginBottom: '40px',
          textTransform: 'uppercase', letterSpacing: '1px'
        }}>
          Secure Access Terminal
        </div>

        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            autoComplete="username"
            placeholder="SYSTEM_USER / EMAIL" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
          
          <input 
            type="password" 
            autoComplete="current-password"
            placeholder="ACCESS_KEY / PASSWORD" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />

          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: '100%', padding: '12px', backgroundColor: 'transparent',
              border: `2px solid ${cyberColors.status.online}`, borderRadius: '8px',
              color: cyberColors.status.online, fontFamily: "'JetBrains Mono', monospace",
              fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s',
              boxShadow: `0 0 10px ${cyberColors.status.online}22`, marginBottom: '25px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
            }}
          >
            {loading ? 'AUTHENTICATING...' : '> Initialize Session'}
          </button>
        </form>

        <div style={{ 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderTop: `1px solid ${cyberColors.border}`, paddingTop: '20px'
        }}>
          <Link to="/register" style={actionLinkStyle}>[ Create Account ]</Link>
          <Link to="/forgot-password" style={actionLinkStyle}>Forgot Key?</Link>
        </div>

        <div style={{
          position: 'absolute', bottom: '10px', left: 0, width: '100%',
          fontSize: '10px', color: 'rgba(255,255,255,0.1)', fontFamily: "'JetBrains Mono', monospace",
        }}>
          [SYS_STATUS: AWAITING_AUTH] - v1.0.2
        </div>
      </div>
    </div>
  );
}