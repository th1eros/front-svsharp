// src/pages/Assets.tsx
import { Link } from 'react-router-dom';

// [CTO] Definição de Interface para garantir a segurança de tipos (Evita implicit 'any').
interface Asset {
    id: number;
    nome: string;
    tipo: string;
    ambiente: string;
    habilitado: boolean;
}

export default function Assets() {
    const assets: Asset[] = [];

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
                            <th style={{ padding: '12px', textAlign: 'center' }}>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assets.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
                                    No active assets found. Try adding one or restoring from archive.
                                </td>
                            </tr>
                        ) : (
                            assets.map(asset => (
                                <tr key={asset.id} style={{ borderBottom: '1px solid #1e293b' }}>
                                    <td style={{ padding: '12px', fontWeight: 600 }}>{asset.nome}</td>
                                    <td style={{ padding: '12px', color: '#94a3b8' }}>{asset.tipo}</td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{ 
                                            padding: '4px 8px', 
                                            borderRadius: '4px', 
                                            backgroundColor: '#1e293b', 
                                            fontSize: '12px',
                                            fontWeight: 'bold'
                                        }}>
                                            {asset.ambiente}
                                        </span>
                                    </td>
                                    <td style={{ 
                                        padding: '12px', 
                                        color: asset.habilitado ? '#2a9d8f' : '#e63946', 
                                        fontWeight: 'bold' 
                                    }}>
                                        {asset.habilitado ? 'ONLINE' : 'OFFLINE'}
                                    </td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>
                                        <Link to={`/assets/${asset.id}`} style={{
                                            color: '#0077b6', textDecoration: 'none', fontWeight: 500
                                        }}>
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}