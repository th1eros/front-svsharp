import { useEffect, useState } from 'react';
import api from '../services/api';
import type { ResponseModel, Vuln } from '../shared/ResponseModel';

/**
 * Dashboard Operacional
 * Baseado na paleta Deep Sea com Cards de Severidade.
 */
export default function Dashboard() {
  const [stats, setStats] = useState({
    critical: 0,
    high: 0,
    medium: 0,
    low: 0
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await api.get<ResponseModel<Vuln[]>>('/vulns');
        if (response.data.status) {
          const data = response.data.dados;
          setStats({
            critical: data.filter(v => v.nivel === 'Critica').length,
            high: data.filter(v => v.nivel === 'Alta').length,
            medium: data.filter(v => v.nivel === 'Media').length,
            low: data.filter(v => v.nivel === 'Baixa').length,
          });
        }
      } catch (err) {
        console.error("DASHBOARD_SYNC_ERROR");
      }
    }
    fetchStats();
  }, []);

  const cards = [
    { label: 'Critical', value: stats.critical, color: '#e63946', bg: 'rgba(230, 57, 70, 0.15)' },
    { label: 'High', value: stats.high, color: '#f4a261', bg: 'rgba(244, 162, 97, 0.15)' },
    { label: 'Medium', value: stats.medium, color: '#0077b6', bg: 'rgba(0, 119, 182, 0.15)' },
    { label: 'Low', value: stats.low, color: '#2a9d8f', bg: 'rgba(42, 157, 143, 0.15)' },
  ];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
      <header style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#fff' }}>Dashboard</h2>
        <p style={{ color: '#64748b', fontSize: '14px' }}>Visão geral de segurança e ativos ativos.</p>
      </header>

      {/* Grid de Cards de Severidade */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '20px',
        marginBottom: '40px' 
      }}>
        {cards.map((card) => (
          <div key={card.label} style={{
            backgroundColor: '#0a1931',
            borderRadius: '16px',
            padding: '24px',
            border: `1px solid ${card.bg}`,
            boxShadow: `0 10px 30px rgba(0,0,0,0.3)`,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Efeito visual de brilho lateral */}
            <div style={{ position: 'absolute', left: 0, top: 0, width: '4px', height: '100%', backgroundColor: card.color }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: card.color, fontSize: '14px', fontWeight: 600, textTransform: 'uppercase' }}>{card.label}</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>● Live</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <span style={{ fontSize: '36px', fontWeight: 700 }}>{card.value}</span>
              <div style={{ width: '40px', height: '10px', background: `linear-gradient(90deg, ${card.color}, transparent)`, borderRadius: '5px' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder para Gráficos e Tabelas Recentes conforme imagem */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div style={{ backgroundColor: '#0a1931', borderRadius: '16px', padding: '24px', height: '300px', border: '1px solid #1e293b' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '20px', color: '#94a3b8' }}>Vulnerabilities Overview</h3>
          <div style={{ height: '80%', borderBottom: '1px dashed #1e293b', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around' }}>
             {/* Simulação de gráfico de barras */}
             {[40, 70, 45, 90, 65].map((h, i) => <div key={i} style={{ width: '30px', height: `${h}%`, backgroundColor: '#1e293b', borderRadius: '5px 5px 0 0' }} />)}
          </div>
        </div>
        
        <div style={{ backgroundColor: '#0a1931', borderRadius: '16px', padding: '24px', border: '1px solid #1e293b' }}>
           <h3 style={{ fontSize: '16px', marginBottom: '20px', color: '#94a3b8' }}>Asset Distribution</h3>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {['DEV', 'HML', 'PROD'].map(env => (
                <div key={env} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px' }}>{env}</span>
                  <div style={{ flex: 1, height: '6px', backgroundColor: '#1e293b', margin: '0 15px', borderRadius: '3px', overflow: 'hidden' }}>
                     <div style={{ width: env === 'PROD' ? '40%' : '30%', height: '100%', backgroundColor: '#0077b6' }} />
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}