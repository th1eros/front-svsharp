// Arquivo: src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Assets from "./pages/Assets";
import Vulns from "./pages/Vulns";
import AssetDetails from "./pages/AssetDetails";
import AdminLayout from "./shared/layout/AdminLayout";

// Explicação para o estagiário:
// Esta função é o nosso "Segurança da Portaria". 
// Ela verifica se o crachá (token) existe no navegador antes de deixar entrar.
function PrivateRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("@SVSharp:token");
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Rota Protegida: O AdminLayout serve como o 'Template' das páginas internas */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        {/* O 'index' faz com que ao acessar a raiz, ele caia direto no dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="assets" element={<Assets />} />
        <Route path="assets/:id" element={<AssetDetails />} />
        <Route path="vulnerabilities" element={<Vulns />} />
      </Route>

      {/* Caso o usuário digite qualquer coisa errada, mandamos para o login (Fallback de Segurança) */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}