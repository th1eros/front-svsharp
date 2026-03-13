import { cyberColors } from "../shared/theme/cyberColors";
import SeverityBadge from "../components/SeverityBadge";

// [CIO] Dados simulados 🧪
const mockVulns = [
  { id: 1, title: "SQL Injection", severity: "Critica", asset: "DB-Production" },
  { id: 2, title: "Outdated SSH", severity: "Alta", asset: "Web-Server-01" },
  { id: 3, title: "Weak SSL Ciphers", severity: "Media", asset: "Load-Balancer" },
];

export default function Dashboard() {
  return (
    <div style={{ color: 'white' }}>
      <h1 style={{ marginBottom: '30px', fontSize: '28px' }}>Security Overview</h1>
      
      <div style={{ 
        backgroundColor: cyberColors.card, 
        borderRadius: '12px', 
        padding: '24px',
        border: `1px solid ${cyberColors.border}`,
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${cyberColors.border}`, textAlign: 'left' }}>
              <th style={{ padding: '12px', color: cyberColors.text.secondary }}>Vulnerability</th>
              <th style={{ padding: '12px', color: cyberColors.text.secondary }}>Asset</th>
              <th style={{ padding: '12px', color: cyberColors.text.secondary }}>Severity</th>
            </tr>
          </thead>
          <tbody>
            {mockVulns.map((vuln) => (
              <tr key={vuln.id} style={{ borderBottom: `1px solid ${cyberColors.border}55` }}>
                <td style={{ padding: '16px 12px', fontWeight: '500' }}>{vuln.title}</td>
                <td style={{ padding: '16px 12px', color: cyberColors.text.secondary }}>{vuln.asset}</td>
                <td style={{ padding: '16px 12px' }}>
                  <SeverityBadge level={vuln.severity} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}