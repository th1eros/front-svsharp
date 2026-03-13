// Arquivo: src/shared/layout/Sidebar.tsx
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
    const location = useLocation();
    
    const menuItems = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Assets', path: '/assets' },
        { name: 'Vulnerabilities', path: '/vulns' },
    ];

    return (
        <div style={{
            width: '260px', height: '100vh', backgroundColor: '#0a1931',
            borderRight: '1px solid #1e293b', padding: '20px', display: 'flex',
            flexDirection: 'column', gap: '10px', position: 'fixed', zIndex: 101
        }}>
            <h2 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '40px', fontWeight: 800 }}>SV SHARP</h2>
            
            {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <Link key={item.path} to={item.path} style={{
                        color: isActive ? '#fff' : '#94a3b8',
                        backgroundColor: isActive ? 'rgba(0, 119, 182, 0.2)' : 'transparent',
                        textDecoration: 'none', padding: '12px 16px', borderRadius: '8px',
                        fontFamily: 'sans-serif', fontWeight: 500, transition: '0.2s',
                        display: 'flex', alignItems: 'center', gap: '10px'
                    }}>
                        {item.name}
                    </Link>
                );
            })}
        </div>
    );
}