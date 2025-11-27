import { useData } from "context/DataContext";
import { useNavigate } from "react-router-dom";

export default function useHomePage() {
  const navigate = useNavigate();
  const { data } = useData();

  const labCount = data.labs.length;
  const { sql, python } = data.hackerrank_stats;

  return {
    navigate,
    data,
    labCount,
    sql,
    python,
  };
}
