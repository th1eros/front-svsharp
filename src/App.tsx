import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Assets from "./pages/Assets";
import Vulns from "./pages/Vulns";
import AssetDetails from "./pages/AssetDetails";
import AdminLayout from "./shared/layout/AdminLayout";

// Componente de Proteção (CISO)
function PrivateRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("@SVSharp:token");
  
  // Se não houver token, barra a entrada
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Grupo Protegido */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          {/* O Outlet do AdminLayout vai renderizar estes componentes abaixo: */}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="assets" element={<Assets />} />
          <Route path="assets/:id" element={<AssetDetails />} />
          <Route path="vulnerabilities" element={<Vulns />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}