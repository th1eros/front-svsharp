import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import type { ResponseModel, Asset, Vuln } from "../shared/ResponseModel";

/**
 * Detalhes do Ativo e Gestão de Vínculos (N:N)
 * Design seguindo a paleta Navy Blue/Cyberpunk.
 */
export default function AssetDetails() {
  const { id } = useParams<{ id: string }>();
  const [asset, setAsset] = useState<Asset | null>(null);
  const [allVulns, setAllVulns] = useState<Vuln[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);
      // Busca detalhes do ativo e todas as vulnerabilidades disponíveis
      const [assetRes, vulnsRes] = await Promise.all([
        api.get<ResponseModel<Asset>>(`/assets/${id}`),
        api.get<ResponseModel<Vuln[]>>("/vulns")
      ]);

      if (assetRes.data.status) setAsset(assetRes.data.dados);
      if (vulnsRes.data.status) setAllVulns(vulnsRes.data.dados);
    } catch (err) {
      console.error("DATA_FETCH_ERROR");
    } finally {
      setLoading(false);
    }
  };

  const handleLink = async (vulnId: number, action: 'add' | 'remove') => {
    try {
      if (action === 'add') {
        await api.post(`/assets/${id}/vulnerabilities/${vulnId}`);
      } else {
        await api.delete(`/assets/${id}/vulnerabilities/${vulnId}`);
      }
      loadData(); // Refresh nos dados após alteração
    } catch (err) {
      alert("Erro ao processar vínculo.");
    }
  };

  if (loading) return <div style={{ color: '#0f0', padding: '20px' }}>ANALYZING_ASSET_STRUCTURE...</div>;
  if (!asset) return <div style={{ color: '#f00', padding: '20px' }}>ASSET_NOT_FOUND</div>;

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <header style={{ marginBottom: '30px', borderLeft: '4px solid #0077b6', paddingLeft: '20px' }}>
        <h2 style={{ fontSize: '28px', color: '#fff' }}>{asset.nome}</h2>
        <p style={{ color: '#64748b' }}>ID: {asset.id} | Environment: <span style={{ color: '#0077b6' }}>{asset.ambiente}</span></p>
      </header>

      <div style={{ backgroundColor: '#0a1931', borderRadius: '16px', padding: '24px', border: '1px solid #1e293b' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '20px', color: '#94a3b8' }}>Vulnerabilities Mapping</h3>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#e2e8f0' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #1e293b' }}>
              <th style={{ padding: '12px' }}>TITLE</th>
              <th style={{ padding: '12px' }}>SEVERITY</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {allVulns.map((v) => (
              <tr key={v.id} style={{ borderBottom: '1px solid #1e293b', transition: '0.2s' }}>
                <td style={{ padding: '12px' }}>{v.titulo}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ 
                    color: v.nivel === 'Critica' ? '#e63946' : v.nivel === 'Alta' ? '#f4a261' : '#2a9d8f',
                    fontSize: '12px', fontWeight: 'bold'
                  }}>
                    {v.nivel.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '12px', textAlign: 'right', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button 
                    onClick={() => handleLink(v.id, 'add')}
                    style={{ backgroundColor: '#1e293b', color: '#0f0', border: '1px solid #0f0', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    LINK
                  </button>
                  <button 
                    onClick={() => handleLink(v.id, 'remove')}
                    style={{ backgroundColor: '#1e293b', color: '#e63946', border: '1px solid #e63946', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    UNLINK
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}