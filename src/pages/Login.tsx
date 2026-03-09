import React, { useState } from "react";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const token = await authService.login(username, password);
      if (token) {
        navigate("/dashboard", { replace: true });
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("Usuário ou senha inválidos.");
      } else {
        setError("Erro de conexão com o servidor.");
      }
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0B1120' }}>
      <form onSubmit={handleLogin} style={{ backgroundColor: '#162031', padding: '40px', borderRadius: '12px', display: 'flex', flexDirection: 'column', width: '350px' }}>
        <h1 style={{ color: 'white', textAlign: 'center' }}>SVSharp Login</h1>
        <input
          style={{ padding: '12px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #1E293B', backgroundColor: '#0B1120', color: 'white' }}
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          style={{ padding: '12px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #1E293B', backgroundColor: '#0B1120', color: 'white' }}
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" style={{ padding: '12px', backgroundColor: '#3B82F6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          Entrar no Sistema
        </button>
        {error && (
          <p style={{ color: '#FF4D4D', marginTop: '15px', textAlign: 'center', fontWeight: 'bold' }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
}