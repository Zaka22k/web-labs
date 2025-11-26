import { createContext, useContext, useState, useEffect } from "react";
import API from "../api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true); // ВАЖНО: true по умолчанию

  useEffect(() => {
    const init = async () => {
      const access = localStorage.getItem("access_token");

      if (!access) {
        setIsAuth(false);
        setLoading(false);
        return;
      }

      try {
        await API.check();
        setIsAuth(true);
      } catch {
        try {
          const res = await API.refresh();
          localStorage.setItem("access_token", res.access_token);
          setIsAuth(true);
        } catch {
          setIsAuth(false);
        }
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
