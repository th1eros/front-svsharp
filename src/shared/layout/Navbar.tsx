import { Link } from "react-router-dom";
import "./Navbar.css";

type NavItem = {
  label: string;
  path: string;
};

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/" },
  { label: "Assets", path: "/assets" },
  { label: "Vulnerabilities", path: "/vulnerabilities" }
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          SVSharp
        </div>

        <nav className="navbar-menu">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className="navbar-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}