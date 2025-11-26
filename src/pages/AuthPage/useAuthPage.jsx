import { useState } from "react";
import { useNotify, useAuth } from "context";
import API from "../../api";
import { useNavigate } from "react-router-dom";

export default function useAuthPage() {
  const { notifySuccess, notifyError } = useNotify();
  const navigate = useNavigate();
  const { setIsAuth } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    login: null,
    password: null,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.login(formData.login, formData.password);
      notifySuccess({ info: res.msg });
      setIsAuth(true);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const msg = err.response?.data?.msg || "Не удалось войти";
      notifyError({ info: msg });
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    formData,
    setFormData,
    handleSubmit,
  };
}
