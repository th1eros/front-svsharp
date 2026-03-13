import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('https://localhost:7165/api/Auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message || "Conta criada!");
                navigate('/login');
            } else {
                alert(data.message || "Erro ao registrar.");
            }
        } catch (error) {
            console.error("Erro na conexão:", error);
            alert("Não foi possível conectar ao servidor.");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#050a14' }}>
            <form onSubmit={handleRegister} style={{ backgroundColor: '#0a1931', padding: '40px', borderRadius: '12px', width: '350px', border: '1px solid #1e293b' }}>
                <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '30px', fontFamily: 'sans-serif' }}>CRIAR CONTA</h2>
                
                <input 
                    type="text" 
                    placeholder="USUÁRIO" 
                    required
                    onChange={e => setForm({...form, username: e.target.value})} 
                    style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '4px', border: 'none', backgroundColor: '#16213e', color: '#fff' }} 
                />
                
                <input 
                    type="password" 
                    placeholder="SENHA" 
                    required
                    onChange={e => setForm({...form, password: e.target.value})} 
                    style={{ width: '100%', padding: '12px', marginBottom: '25px', borderRadius: '4px', border: 'none', backgroundColor: '#16213e', color: '#fff' }} 
                />
                
                <button 
                    type="submit" 
                    style={{ width: '100%', padding: '12px', backgroundColor: '#2a9d8f', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                    REGISTRAR
                </button>
                
                <Link to="/login" style={{ display: 'block', textAlign: 'center', marginTop: '15px', color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>
                    Já tem conta? Voltar ao login
                </Link>
            </form>
        </div>
    );
}