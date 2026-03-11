import { cyberColors } from "../theme/cyberColors";

/**
 * [CIO] Navbar de Utilitários
 * Foco em identidade do usuário e status do sistema.
 */
export default function Navbar() {
  return (
    <header style={{
      height: '64px',
      backgroundColor: 'rgba(11, 17, 32, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: `1px solid ${cyberColors.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>Admin User</div>
          {/* [CTO] Agora o TypeScript reconhece o caminho cyberColors.status.online */}
          <div style={{ color: cyberColors.status.online, fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '5px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: cyberColors.status.online }}></span>
            Connected
          </div>
        </div>
        
        <div style={{ 
          width: '38px', height: '38px', borderRadius: '10px', 
          background: cyberColors.severity.medium,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px', boxShadow: `0 0 15px ${cyberColors.severity.medium}44`
        }}>
          👤
        </div>
      </div>
    </header>
  );
}