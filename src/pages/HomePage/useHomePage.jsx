import { useData } from "context/DataContext";
import { useNavigate } from "react-router-dom";

export default function useHomePage() {
  const navigate = useNavigate();
  const { data } = useData();

  const labCount = data?.labs.length || 0;
  const { sql, python } = data?.hackerrank_stats || {
    sql: 0,
    python: 0,
  };

  return {
    navigate,
    data,
    labCount,
    sql,
    python,
  };
}
