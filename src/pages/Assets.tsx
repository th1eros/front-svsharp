// Arquivo: src/pages/Assets.tsx
import { useEffect, useState } from 'react';
import api from '../services/api';
import type { ResponseModel, Asset } from '../shared/ResponseModel';

export default function Assets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<ResponseModel<Asset[]>>('/assets').then(res => {
      if (res.data.status) setAssets(res.data.dados);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{ color: '#fff', padding: '20px' }}>Loading Assets...</div>;

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <h2 style={{ marginBottom: '24px' }}>Active Assets</h2>
      <div style={{ backgroundColor: '#0a1931', borderRadius: '16px', padding: '20px', border: '1px solid #1e293b' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #1e293b', color: '#94a3b8' }}>
              <th style={{ padding: '12px' }}>NAME</th>
              <th style={{ padding: '12px' }}>TYPE</th>
              <th style={{ padding: '12px' }}>ENV</th>
              <th style={{ padding: '12px' }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {assets.map(asset => (
              <tr key={asset.id} style={{ borderBottom: '1px solid #1e293b' }}>
                <td style={{ padding: '12px', fontWeight: 600 }}>{asset.nome}</td>
                <td style={{ padding: '12px', color: '#94a3b8' }}>{asset.tipo}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: '#1e293b', fontSize: '12px' }}>
                    {asset.ambiente}
                  </span>
                </td>
                <td style={{ padding: '12px', color: asset.habilitado ? '#2a9d8f' : '#e63946', fontWeight: 'bold' }}>
                  {asset.habilitado ? '● Active' : '○ Disabled'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}