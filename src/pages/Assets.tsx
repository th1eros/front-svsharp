import { useState, useEffect } from 'react';
import { cyberColors } from '../shared/theme/cyberColors'; 
import api from '../services/api';

export default function Assets() {
  const [assets, setAssets] = useState<any[]>([]);
  const [vulns, setVulns] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [sideMode, setSideMode] = useState<'vincular' | 'editar' | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);

  useEffect(() => {
    fetchAssets();
    fetchVulns();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await api.get("/api/assets");
      setAssets(response.data.dados || []);
    } catch (err) { console.error("Erro ao carregar ativos"); }
  };

  const fetchVulns = async () => {
    try {
      const response = await api.get("/api/vulns");
      setVulns(response.data.dados || []);
    } catch (err) { console.error("Erro ao carregar vulns"); }
  };

  const handleSaveAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsset.nome) return alert("Nome obrigatório!");
    try {
      setLoading(true);
      if (selectedAsset?.id) {
        await api.put(`/api/assets/${selectedAsset.id}`, { nome: selectedAsset.nome });
      } else {
        await api.post("/api/assets", { nome: selectedAsset.nome });
      }
      setSideMode(null);
      fetchAssets();
    } catch (err) { alert("Erro ao salvar."); }
    finally { setLoading(false); }
  };

  const handleConfirmVinculo = async (vulnId: number) => {
    try {
      setLoading(true);
      await api.post(`/api/assets/${selectedAsset.id}/vulnerabilities/${vulnId}`);
      alert("Vínculo realizado com sucesso! ✅");
      setSideMode(null);
      fetchAssets();
    } catch (err) { alert("Erro ao vincular."); }
    finally { setLoading(false); }
  };

  const handleRestaurar = async (id: number) => {
    try {
      await api.patch(`/api/assets/${id}/restore`);
      fetchAssets();
    } catch (err) { alert("Erro ao restaurar."); }
  };

  // ESTILOS AZULADOS 🟦
  const blueGradient = `linear-gradient(135deg, ${cyberColors.effects.neonBlue}, #0052D4)`;
  
  const actionButtonStyle = { 
    background: blueGradient, 
    color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', 
    fontWeight: 'bold' as const, cursor: 'pointer', boxShadow: `0 0 15px ${cyberColors.effects.neonBlue}44`
  };

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <h2 style={{ background: blueGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 'bold' }}>
          🛡️ Gestão de Ativos
        </h2>
        <button onClick={() => { setSelectedAsset({ nome: '' }); setSideMode('editar'); }} style={actionButtonStyle}>
          + NOVO ATIVO
        </button>
      </div>

      <div style={{ background: cyberColors.card, borderRadius: '12px', border: `1px solid ${cyberColors.effects.neonBlue}33` }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: `2px solid ${cyberColors.effects.neonBlue}`, color: '#94a3b8' }}>
              <th style={{ padding: '15px' }}>ID</th>
              <th style={{ padding: '15px' }}>NOME ATIVO</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {assets.map(asset => (
              <tr key={asset.id} style={{ borderBottom: `1px solid ${cyberColors.border}` }}>
                <td style={{ padding: '15px' }}>#{asset.id}</td>
                <td style={{ padding: '15px' }}>{asset.nome}</td>
                <td style={{ padding: '15px', textAlign: 'center' }}>
                  <button onClick={() => { setSelectedAsset(asset); setSideMode('vincular'); }} style={rowBtn(cyberColors.effects.neonPurple)}>Vincular</button>
                  <button onClick={() => { setSelectedAsset(asset); setSideMode('editar'); }} style={rowBtn(cyberColors.effects.neonBlue)}>Editar</button>
                  <button onClick={() => handleRestaurar(asset.id)} style={rowBtn(cyberColors.effects.neonBlue)}>Restaurar</button>
                  <button onClick={() => api.patch(`/api/assets/${asset.id}/archive`).then(() => fetchAssets())} style={rowBtn('#475569')}>Arquivar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DRAWER AZUL */}
      <div style={{
        position: 'fixed', top: 0, right: sideMode ? 0 : '-500px',
        width: '450px', height: '100vh', background: '#0B1120',
        borderLeft: `2px solid ${cyberColors.effects.neonBlue}`, transition: '0.4s ease', 
        zIndex: 1000, padding: '40px', boxShadow: '-10px 0 30px rgba(0,0,0,0.5)'
      }}>
        <button onClick={() => setSideMode(null)} style={{ color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}>✕ FECHAR</button>
        {sideMode === 'editar' && (
          <form onSubmit={handleSaveAsset} style={{ marginTop: '20px' }}>
            <h3 style={{ color: cyberColors.effects.neonBlue }}>{selectedAsset?.id ? 'Atualizar Ativo' : 'Novo Registro'}</h3>
            <input style={inputStyle} value={selectedAsset?.nome || ''} onChange={e => setSelectedAsset({...selectedAsset, nome: e.target.value})} placeholder="Nome do Ativo" />
            <button type="submit" style={{ ...actionButtonStyle, width: '100%' }}>{loading ? 'PROCESSANDO...' : 'SALVAR ATIVO'}</button>
          </form>
        )}
        {sideMode === 'vincular' && (
          <div style={{ marginTop: '20px' }}>
            <h3 style={{ color: cyberColors.effects.neonPurple }}>Vincular Vulnerabilidade</h3>
            {vulns.map(v => (
              <div key={v.id} style={itemStyle}>
                <span>{v.titulo}</span>
                <button onClick={() => handleConfirmVinculo(v.id)} style={miniBtn(cyberColors.effects.neonBlue)}>VINCULAR</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const rowBtn = (color: string) => ({ background: 'transparent', border: `1px solid ${color}`, color, padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', margin: '0 5px', fontSize: '11px' });
const inputStyle = { width: '100%', padding: '12px', background: '#1E293B', border: '1px solid #334155', color: 'white', borderRadius: '8px', marginBottom: '20px' };
const itemStyle = { display: 'flex', justifyContent: 'space-between', padding: '12px', borderBottom: '1px solid #1E293B', alignItems: 'center' };
const miniBtn = (bg: string) => ({ background: bg, color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' as const });