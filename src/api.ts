import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5073",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("@SVSharp:token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(`🚀 Token injetado para: ${config.url}`);
    } else {
      console.warn("⚠️ Requisição sem token de autenticação.");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("🚫 Não autorizado. Limpando sessão.");
      localStorage.removeItem("@SVSharp:token");
    }
    return Promise.reject(error);
  }
);

export default api;