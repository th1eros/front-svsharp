import type { ReactNode } from "react";
import Navbar from "./Navbar";
import "./Layout.css";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout-root">
      <Navbar />

      <main className="layout-container">
        {children}
      </main>
    </div>
  );
}