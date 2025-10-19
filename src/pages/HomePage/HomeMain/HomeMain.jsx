import styles from "./HomeMain.module.css";
import Profile from "../Profile/Profile";
import Scores from "../Scores/Scores";
import LabsList from "../LabsList/LabsList";
import { useEffect, useState } from "react";

const DATA_URL = import.meta.env.VITE_DATA_URL;

const HomeMain = () => {
  const [data, setData] = useState(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function loadData() {
      setHasError(false);
      try {
        const res = await fetch(DATA_URL);
        if (!res.ok) throw new Error(`Ошибка загрузки данных: ${res.status}`);
        const json = await res.json();

        setData(json);
        sessionStorage.setItem("labsData", JSON.stringify(json.labs));
      } catch (err) {
        console.error("Ошибка загрузки данных:", err);
        setHasError(true);
      }
    }
    loadData();
  }, []);

  if (hasError)
    return (
      <main className={styles.mainError}>
        Произошла ошибка<button onClick={() => loadData()}>Обновить</button>
      </main>
    );
  if (!data) return <main className={styles.mainLoad}>Загрузка...</main>;

  return (
    <main className={styles.main}>
      <Profile
        fullname={"Пристёгин Семен Эдуардович"}
        group={"ИТ2204"}
        update_at={data.update_at}
      />
      <LabsList labs={data.labs} />
      <Scores sql={data.sql_score} python={data.python_score} />
    </main>
  );
};

export default HomeMain;
