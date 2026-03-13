// Arquivo: src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://api-svsharp.onrender.com/api",
  timeout: 60000, 
});

// Injeção de Token (Camada de Segurança CISO)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("@SVSharp:token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Tratamento de Sessão (Auth Lifecycle)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se o Back-end .NET retornar 401, limpamos o acesso e deslogamos
    if (error.response?.status === 401) {
      localStorage.removeItem("@SVSharp:token");
      window.location.hash = "/login"; 
    }
    return Promise.reject(error);
  }
);

export default api;