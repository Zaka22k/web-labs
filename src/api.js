import axios from "axios";

const API_URL = import.meta.env.VITE_DATA_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

class API {
  async login(login, password) {
    const res = await api.post(`/login`, { login, password });
    const { access_token, refresh_token, msg } = res.data;

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    return { msg };
  }

  async refresh() {
    const refresh_token = localStorage.getItem("refresh_token");
    if (!refresh_token) throw new Error("Нет refresh токена");

    try {
      const res = await api.post("/refresh", null, {
        headers: { Authorization: `Bearer ${refresh_token}` },
      });
      localStorage.setItem("access_token", res.data.access_token);
      return res.data;
    } catch (err) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      throw err;
    }
  }

  async logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    return { success: true };
  }

  async check() {
    const res = await api.get(`/check`);
    return res.data;
  }

  async details() {
    const res = await api.get(`/details`);
    return res.data;
  }
}

export default new API();
