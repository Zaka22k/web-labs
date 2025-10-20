import { createContext, useContext, useEffect, useMemo, useState } from "react";

const DATA_URL = import.meta.env.VITE_DATA_URL;
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = sessionStorage.getItem("app_data");
    if (cached) {
      setData(JSON.parse(cached));
      setLoading(false);
      return;
    }

    fetch(DATA_URL)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        sessionStorage.setItem("app_data", JSON.stringify(json));
      })
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(() => ({ data, loading }), [data, loading]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
