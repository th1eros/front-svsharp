import { useState, useEffect } from 'react';
import { cyberColors } from '../shared/theme/cyberColors'; 
import api from '../services/api';

export default function Vulns() {
  const [vulns, setVulns] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [sideMode, setSideMode] = useState<'editar' | null>(null);
  const [selectedVuln, setSelectedVuln] = useState<any>(null);

  useEffect(() => { fetchVulns(); }, []);

  const fetchVulns = async () => {
    try {
      const response = await api.get("/api/vulns");
      setVulns(response.data.dados || []);
    } catch (err) { console.error("Erro ao carregar vulns"); }
  };

  const handleSaveVuln = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = { titulo: selectedVuln.titulo, descricao: selectedVuln.descricao, severidade: selectedVuln.severidade };
      if (selectedVuln?.id) {
        await api.put(`/api/vulns/${selectedVuln.id}`, payload);
      } else {
        await api.post("/api/vulns", payload);
      }
      setSideMode(null);
      fetchVulns();
    } catch (err) { alert("Erro ao salvar vulnerabilidade."); }
    finally { setLoading(false); }
  };

  const handleRestaurar = async (id: number) => {
    try {
      await api.patch(`/api/vulns/${id}/restore`);
      fetchVulns();
    } catch (err) { alert("Erro ao restaurar."); }
  };

  // ESTILOS AVERMELHADOS 🟥
  const redGradient = `linear-gradient(135deg, #ff4b2b, ${cyberColors.effects.neonPink})`;
  
  const actionButtonStyle = { 
    background: redGradient, 
    color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', 
    fontWeight: 'bold' as const, cursor: 'pointer', boxShadow: '0 0 15px rgba(255, 75, 43, 0.3)'
  };

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <h2 style={{ background: redGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 'bold' }}>
          ⚠️ Registro de Vulnerabilidades
        </h2>
        <button onClick={() => { setSelectedVuln({ titulo: '', descricao: '', severidade: 'Média' }); setSideMode('editar'); }} style={actionButtonStyle}>
          + NOVA FALHA
        </button>
      </div>

      <div style={{ background: cyberColors.card, borderRadius: '12px', border: `1px solid ${cyberColors.effects.neonPink}33` }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: `2px solid ${cyberColors.effects.neonPink}`, color: '#94a3b8' }}>
              <th style={{ padding: '15px' }}>ID</th>
              <th style={{ padding: '15px' }}>TÍTULO DA FALHA</th>
              <th style={{ padding: '15px' }}>SEVERIDADE</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {vulns.map(v => (
              <tr key={v.id} style={{ borderBottom: `1px solid ${cyberColors.border}` }}>
                <td style={{ padding: '15px' }}>#{v.id}</td>
                <td style={{ padding: '15px' }}>{v.titulo}</td>
                <td style={{ padding: '15px' }}>{v.severidade}</td>
                <td style={{ padding: '15px', textAlign: 'center' }}>
                  <button onClick={() => { setSelectedVuln(v); setSideMode('editar'); }} style={rowBtn(cyberColors.effects.neonPink)}>Editar</button>
                  <button onClick={() => handleRestaurar(v.id)} style={rowBtn(cyberColors.effects.neonPurple)}>Restaurar</button>
                  <button onClick={() => api.patch(`/api/vulns/${v.id}/archive`).then(() => fetchVulns())} style={rowBtn('#475569')}>Arquivar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DRAWER VERMELHO */}
      <div style={{
        position: 'fixed', top: 0, right: sideMode ? 0 : '-500px',
        width: '450px', height: '100vh', background: '#1A0B0B',
        borderLeft: `2px solid ${cyberColors.effects.neonPink}`, transition: '0.4s ease', 
        zIndex: 1000, padding: '40px'
      }}>
        <button onClick={() => setSideMode(null)} style={{ color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}>✕ FECHAR</button>
        {sideMode === 'editar' && (
          <form onSubmit={handleSaveVuln} style={{ marginTop: '20px' }}>
            <h3 style={{ color: cyberColors.effects.neonPink }}>Gerenciar Ameaça</h3>
            <input style={inputStyle} value={selectedVuln?.titulo || ''} onChange={e => setSelectedVuln({...selectedVuln, titulo: e.target.value})} placeholder="Título da Vulnerabilidade" />
            <textarea style={{ ...inputStyle, height: '100px' }} value={selectedVuln?.descricao || ''} onChange={e => setSelectedVuln({...selectedVuln, descricao: e.target.value})} placeholder="Descrição técnica..." />
            <button type="submit" style={{ ...actionButtonStyle, width: '100%' }}>{loading ? 'SALVANDO...' : 'REGISTRAR FALHA'}</button>
          </form>
        )}
      </div>
    </div>
  );
}

const rowBtn = (color: string) => ({ background: 'transparent', border: `1px solid ${color}`, color, padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', margin: '0 5px', fontSize: '11px' });
const inputStyle = { width: '100%', padding: '12px', background: '#2D1B1B', border: '1px solid #452626', color: 'white', borderRadius: '8px', marginBottom: '20px' };