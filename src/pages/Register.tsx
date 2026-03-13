import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { cyberColors } from '../shared/theme/cyberColors';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Estagiário: Enviamos Name, Email e Password para criar o usuário no banco
      await api.post('/users', { name, email, password });
      alert('SYSTEM_MSG: Conta criada com sucesso! Realize o login.');
      navigate('/login');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Erro ao criar conta no terminal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: '100vh', width: '100vw', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#050505', padding: '40px', borderRadius: '12px', border: `1px solid ${cyberColors.status.online}`, textAlign: 'center' }}>
        <h2 style={{ color: cyberColors.status.online, fontFamily: "'JetBrains Mono', monospace" }}>NEW_USER_REGISTRATION</h2>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="FULL_NAME" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '20px', backgroundColor: 'rgba(0,0,0,0.3)', border: `1px solid ${cyberColors.border}`, color: '#fff' }} required />
          <input type="email" placeholder="USER_EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '20px', backgroundColor: 'rgba(0,0,0,0.3)', border: `1px solid ${cyberColors.border}`, color: '#fff' }} required />
          <input type="password" placeholder="ACCESS_KEY" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '25px', backgroundColor: 'rgba(0,0,0,0.3)', border: `1px solid ${cyberColors.border}`, color: '#fff' }} required />
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', border: `2px solid ${cyberColors.status.online}`, color: cyberColors.status.online, backgroundColor: 'transparent', cursor: 'pointer' }}>
            {loading ? 'PROCESSING...' : '> REGISTER_IN_SYSTEM'}
          </button>
        </form>
        <Link to="/login" style={{ color: cyberColors.text.secondary, textDecoration: 'none', display: 'block', marginTop: '20px', fontSize: '12px' }}>[ Back to Login ]</Link>
      </div>
    </div>
  );
}