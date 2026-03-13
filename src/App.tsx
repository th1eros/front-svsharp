import { Routes, Route, Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Assets from "./pages/Assets";
import Vulns from "./pages/Vulns";
import AssetDetails from "./pages/AssetDetails";
import AdminLayout from "./shared/layout/AdminLayout";

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

      <Route
        path="/"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="assets" element={<Assets />} />
        <Route path="assets/:id" element={<AssetDetails />} />
        <Route path="vulnerabilities" element={<Vulns />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}