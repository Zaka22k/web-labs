import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

const DATA_URL = import.meta.env.VITE_DATA_URL;
const CACHE_KEY = "app_data";
const CACHE_TTL = 20 * 60 * 1000;

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(false);

    const cached = localStorage.getItem(CACHE_KEY);

    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        const isExpired = Date.now() - timestamp > CACHE_TTL;

        if (!isExpired) {
          setData(data);
          setLoading(false);
          return;
        } else {
          localStorage.removeItem(CACHE_KEY);
        }
      } catch {
        localStorage.removeItem(CACHE_KEY);
      }
    }

    fetch(DATA_URL)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: json, timestamp: Date.now() })
        );
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const value = useMemo(
    () => ({ data, loading, error, reload: fetchData }),
    [data, loading, error, fetchData]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
