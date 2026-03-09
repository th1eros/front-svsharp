import api from "./api";

export const authService = {
  async login(username: string, password: string): Promise<string> {
    const response = await api.post("/api/auth/login", {
      Username: username,
      Password: password
    });

    const token = response.data?.token || response.data;

    if (!token) {
      throw new Error("Token não retornado");
    }

    localStorage.setItem("@SVSharp:token", token);
    return token;
  },

  logout() {
    localStorage.removeItem("@SVSharp:token");
    window.location.href = "/login";
  }
};