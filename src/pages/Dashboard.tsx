import React, { useEffect, useState, useMemo } from 'react';
import { vulnService } from '../services/vulnService';
import type { VulnResponseDTO } from '../shared/vulnTypes';
import { cyberColors } from '../shared/theme/cyberColors';

const Dashboard: React.FC = () => {
  const [vulns, setVulns] = useState<VulnResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterLevel, setFilterLevel] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState("priority");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await vulnService.listar();
        setVulns(data);
      } catch (error) {
        console.error("Erro ao carregar Dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = useMemo(() => {
    return {
      critica: vulns.filter(v => v.nivel === "Critica").length,
      alta: vulns.filter(v => v.nivel === "Alta").length,
      media: vulns.filter(v => v.nivel === "Media").length,
      baixa: vulns.filter(v => v.nivel === "Baixa").length,
    };
  }, [vulns]);

  const processedVulns = useMemo(() => {
    let result = [...vulns];

    if (filterLevel) {
      result = result.filter(v => v.nivel === filterLevel);
    }

    result.sort((a, b) => {
      const weights: Record<string, number> = { "Critica": 4, "Alta": 3, "Media": 2, "Baixa": 1 };
      
      if (sortOption === "priority") {
        return (weights[b.nivel] || 0) - (weights[a.nivel] || 0);
      }
      if (sortOption === "newest") {
        return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
      }
      if (sortOption === "oldest") {
        return new Date(a.createdAt || '').getTime() - new Date(b.createdAt || '').getTime();
      }
      return 0;
    });

    return result;
  }, [vulns, filterLevel, sortOption]);

  const getSeverityStyle = (nivel: string) => {
    switch (nivel) {
      case 'Critica': return { color: cyberColors.severity.critical };
      case 'Alta': return { color: cyberColors.severity.high };
      case 'Media': return { color: cyberColors.severity.medium };
      default: return { color: cyberColors.severity.low };
    }
  };

  if (loading) return <div style={{ color: 'white', padding: '20px' }}>Carregando dados seguros... 🛡️</div>;

  return (
    <div style={{ backgroundColor: cyberColors.background, minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ color: 'white', marginBottom: '30px' }}>Painel de Segurança</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
        {[
          { label: 'Critical', key: 'Critica', color: cyberColors.severity.critical, count: stats.critica },
          { label: 'High', key: 'Alta', color: cyberColors.severity.high, count: stats.alta },
          { label: 'Medium', key: 'Media', color: cyberColors.severity.medium, count: stats.media },
          { label: 'Low', key: 'Baixa', color: cyberColors.severity.low, count: stats.baixa },
        ].map(item => (
          <div 
            key={item.key}
            onClick={() => setFilterLevel(filterLevel === item.key ? null : item.key)}
            style={{ 
              ...cardStyle, 
              borderLeft: `5px solid ${item.color}`,
              cursor: 'pointer',
              opacity: filterLevel && filterLevel !== item.key ? 0.4 : 1,
              transform: filterLevel === item.key ? 'scale(1.05)' : 'none',
              transition: '0.2s'
            }}
          >
            <span style={labelStyle}>{item.label}</span>
            <h2 style={valueStyle}>{item.count}</h2>
          </div>
        ))}
      </div>

      <div style={tableContainerStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ color: 'white', margin: 0 }}>Vulnerabilidades e Ativos</h3>
          
          <select 
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{ background: '#0F172A', color: 'white', border: `1px solid ${cyberColors.border}`, padding: '8px', borderRadius: '6px', cursor: 'pointer' }}
          >
            <option value="priority">Prioridade: Críticos Primeiro</option>
            <option value="newest">Data: Mais Recentes</option>
            <option value="oldest">Data: Mais Antigos</option>
          </select>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: `1px solid ${cyberColors.border}`, color: cyberColors.text.secondary }}>
              <th style={cellStyle}>ID</th>
              <th style={cellStyle}>Título</th>
              <th style={cellStyle}>Severidade</th>
              <th style={cellStyle}>Ambiente</th>
              <th style={cellStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {processedVulns.slice(0, 10).map((v) => (
              <tr key={v.id} style={{ borderBottom: `1px solid ${cyberColors.border}` }}>
                <td style={cellStyle}>#{v.id}</td>
                <td style={cellStyle}>{v.titulo}</td>
                <td style={{ ...cellStyle, ...getSeverityStyle(v.nivel), fontWeight: 'bold' }}>{v.nivel}</td>
                <td style={cellStyle}>{v.ambiente}</td>
                <td style={cellStyle}>
                   <span style={{ color: v.status === 'Ativa' ? '#10B981' : '#94A3B8' }}>● {v.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Estilos
const cardStyle: React.CSSProperties = {
  backgroundColor: '#162031',
  padding: '20px',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
};

const tableContainerStyle: React.CSSProperties = {
  backgroundColor: '#162031',
  padding: '25px',
  borderRadius: '12px',
  boxShadow: '0 8px 15px rgba(0,0,0,0.4)'
};

const labelStyle = { color: '#94A3B8', fontSize: '0.9rem', fontWeight: 'bold' as const };
const valueStyle = { color: 'white', fontSize: '2.2rem', margin: '10px 0 0 0' };
const cellStyle = { padding: '15px 10px' };

export default Dashboard;