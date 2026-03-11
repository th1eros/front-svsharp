import { Link, useLocation } from "react-router-dom";
import { cyberColors } from "../theme/cyberColors"; // [CTO] '../' sobe uma pasta para achar o theme

export default function Sidebar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navLinkStyle = (path: string) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '8px',
    textDecoration: 'none',
    color: isActive(path) ? 'white' : cyberColors.text.secondary,
    backgroundColor: isActive(path) ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
    borderLeft: isActive(path) ? `4px solid ${cyberColors.severity.medium}` : '4px solid transparent',
    transition: '0.3s',
    marginBottom: '8px'
  });

  return (
    <aside style={{ width: '260px', background: '#16213E', borderRight: `1px solid ${cyberColors.border}`, padding: '24px', display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ color: cyberColors.severity.medium, fontSize: '22px', fontWeight: 'bold', marginBottom: '40px' }}>
        🛡️ SVSharp
      </div>
      <nav style={{ flex: 1 }}>
        <Link to="/dashboard" style={navLinkStyle('/dashboard')}>📊 Dashboard</Link>
        <Link to="/assets" style={navLinkStyle('/assets')}>🖥️ Assets</Link>
        <Link to="/vulnerabilities" style={navLinkStyle('/vulnerabilities')}>⚠️ Vulnerabilities</Link>
      </nav>
    </aside>
  );
}