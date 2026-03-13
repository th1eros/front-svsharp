// Arquivo: src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://api-svsharp.onrender.com",
  timeout: 60000, // Ajustado para 60s para suportar o cold start do Render
});

// Injeção de Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("@SVSharp:token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Tratamento de Sessão
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("@SVSharp:token");
      window.location.hash = "/login"; 
    }
    return Promise.reject(error);
  }
);

export default api;