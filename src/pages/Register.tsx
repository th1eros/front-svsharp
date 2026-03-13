import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

/**
 * Interface de Cadastro de Operadores
 * Alinhada à paleta Deep Sea (#060b19) e efeito Glassmorphism.
 */
export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Endpoint integrado ao Identity do C#
      await api.post('/auth/register', { 
        username, 
        password 
      });
      
      navigate('/login');
    } catch (error: any) {
      console.error("REGISTER_FAILED");
      alert(error.response?.data?.message || 'Falha na comunicação com a API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      height: '100vh', 
      width: '100vw', 
      backgroundColor: '#060b19', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: `radial-gradient(circle at center, #0a1931 0%, #060b19 100%)`
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '400px', 
        backgroundColor: 'rgba(10, 25, 49, 0.6)', 
        padding: '40px', 
        borderRadius: '20px', 
        border: '1px solid #1e293b', 
        textAlign: 'center',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
      }}>
        <h2 style={{ 
          color: '#fff', 
          marginBottom: '30px', 
          fontFamily: "'Inter', sans-serif",
          letterSpacing: '1px'
        }}>
          Create Account
        </h2>
        
        <form onSubmit={handleRegister}>
          <input 
            type="text" 
            placeholder="USERNAME" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            style={{ 
              width: '100%', 
              padding: '12px', 
              marginBottom: '15px', 
              backgroundColor: '#060b19', 
              border: '1px solid #1e293b', 
              borderRadius: '8px',
              color: '#fff',
              outline: 'none'
            }} 
            required 
          />
          <input 
            type="password" 
            placeholder="PASSWORD" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ 
              width: '100%', 
              padding: '12px', 
              marginBottom: '25px', 
              backgroundColor: '#060b19', 
              border: '1px solid #1e293b', 
              borderRadius: '8px',
              color: '#fff',
              outline: 'none'
            }} 
            required 
          />
          <button 
            type="submit" 
            disabled={loading} 
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#0077b6', 
              color: '#fff', 
              fontWeight: 'bold', 
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: '0.3s'
            }}
          >
            {loading ? 'CREATING...' : 'REGISTER SYSTEM'}
          </button>
        </form>
        
        <Link to="/login" style={{ 
          color: '#94a3b8', 
          textDecoration: 'none', 
          display: 'block', 
          marginTop: '20px', 
          fontSize: '13px' 
        }}>
          Already have an account? <span style={{ color: '#0077b6' }}>Login here</span>
        </Link>
      </div>
    </div>
  );
}