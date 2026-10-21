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
    localStorage.setItem("access_token", "demo_token");
    localStorage.setItem("refresh_token", "demo_refresh");
    return { msg: "Успешный вход" };
  }

  async check() {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("Не авторизован");
    return { ok: true };
  }

  async details() {
    const res = await axios.get(`${import.meta.env.BASE_URL}data.json`);
    return res.data;
  }
}

export default new API();
