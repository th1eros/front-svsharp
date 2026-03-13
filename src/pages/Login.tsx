// Arquivo: src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import type { LoginResponse } from '../shared/ResponseModel';

export default function Login() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post<LoginResponse>('/auth/login', { username: user, password: pass });
      localStorage.setItem("@SVSharp:token", res.data.token);
      navigate('/dashboard');
    } catch { alert("ACESSO_NEGADO"); }
  };

  return (
    <div style={{ 
      height: '100vh', backgroundColor: '#060b19', display: 'flex', 
      alignItems: 'center', justifyContent: 'center',
      background: `radial-gradient(circle at center, #0a1931 0%, #060b19 100%)`
    }}>
      <form onSubmit={handleLogin} style={{ 
        backgroundColor: 'rgba(10, 25, 49, 0.6)', padding: '40px', borderRadius: '20px',
        border: '1px solid #1e293b', width: '350px', backdropFilter: 'blur(10px)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
      }}>
        <h1 style={{ color: '#fff', textAlign: 'center', marginBottom: '30px', letterSpacing: '2px' }}>SV SHARP</h1>
        <input type="text" placeholder="USUÁRIO" onChange={e => setUser(e.target.value)} style={{
          width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px',
          border: '1px solid #1e293b', backgroundColor: '#060b19', color: '#fff', outline: 'none'
        }} />
        <input type="password" placeholder="SENHA" onChange={e => setPass(e.target.value)} style={{
          width: '100%', padding: '12px', marginBottom: '25px', borderRadius: '8px',
          border: '1px solid #1e293b', backgroundColor: '#060b19', color: '#fff', outline: 'none'
        }} />
        <button type="submit" style={{
          width: '100%', padding: '12px', borderRadius: '8px', border: 'none',
          backgroundColor: '#0077b6', color: '#fff', fontWeight: 'bold', cursor: 'pointer'
        }}>ENTRAR</button>
      </form>
    </div>
  );
}