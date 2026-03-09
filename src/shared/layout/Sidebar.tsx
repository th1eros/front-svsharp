import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      style={{
        width: 220,
        background: "#0D0D0D",
        color: "#FFFFFF",
        padding: 20
      }}
    >
      <h3 style={{ color: "#4DA6FF" }}>Menu</h3>

      <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Link to="/assets" style={{ color: "#CCCCCC", textDecoration: "none" }}>
          Assets
        </Link>
      </nav>
    </div>
  );
}