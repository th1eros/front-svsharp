// Arquivo: src/pages/Vulns.tsx
import { useEffect, useState } from 'react';
import api from '../services/api';
// [CTO] 'import type' resolve o erro ts(1484) de 'verbatimModuleSyntax'
import type { ResponseModel, Vuln } from '../shared/ResponseModel';

export default function Vulns() {
  const [vulns, setVulns] = useState<Vuln[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const response = await api.get<ResponseModel<Vuln[]>>('/vulns');
        if (response.data.status) setVulns(response.data.dados);
      } catch (err) {
        console.error("FAILED_TO_SYNC_VULNS");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div style={{ color: '#0077b6', padding: '20px' }}>DECRYPTING_VULNERABILITIES...</div>;

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <h2 style={{ marginBottom: '24px', color: '#fff' }}>Vulnerabilities List</h2>
      <div style={{ backgroundColor: '#0a1931', borderRadius: '16px', padding: '20px', border: '1px solid #1e293b' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#e2e8f0' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #1e293b', color: '#94a3b8' }}>
              <th style={{ padding: '12px' }}>ID</th>
              <th style={{ padding: '12px' }}>NAME</th>
              <th style={{ padding: '12px' }}>SEVERITY</th>
              <th style={{ padding: '12px' }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {vulns.map(v => (
              <tr key={v.id} style={{ borderBottom: '1px solid #1e293b' }}>
                <td style={{ padding: '12px' }}>#{v.id}</td>
                <td style={{ padding: '12px', fontWeight: 600 }}>{v.titulo}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ 
                    color: v.nivel === 'Critica' ? '#e63946' : v.nivel === 'Alta' ? '#f4a261' : '#0077b6',
                    fontWeight: 'bold', fontSize: '12px' 
                  }}>
                    {v.nivel.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{ color: '#2a9d8f' }}>Active</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}