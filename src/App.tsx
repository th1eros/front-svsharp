import { Routes, Route, Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Assets from "./pages/Assets";
import Vulns from "./pages/Vulns";
import AssetDetails from "./pages/AssetDetails";
import AdminLayout from "./shared/layout/AdminLayout";

function PrivateRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("@SVSharp:token");
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>

        <Route index element={<Navigate to="dashboard" replace />} />
        
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="assets" element={<Assets />} />
        <Route path="assets/:id" element={<AssetDetails />} />
        
        {/* Sincronizado com o path '/vulns' definido na Sidebar */}
        <Route path="vulns" element={<Vulns />} />
      </Route>

      {/* Fallback global para segurança: qualquer rota inexistente joga para o Login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}