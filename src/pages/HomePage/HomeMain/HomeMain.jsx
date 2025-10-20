import styles from "./HomeMain.module.css";
import Profile from "../Profile/Profile";
import Scores from "../Scores/Scores";
import LabsList from "../LabsList/LabsList";
import { useData } from "context/DataContext";
import React from "react";

const HomeMain = React.memo(() => {
  const { data, loading } = useData();

  if (loading) return <main className={styles.mainLoad}>Загрузка...</main>;
  if (!data)
    return <main className={styles.mainLoad}>Ошибка загрузки данных</main>;

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
});

export default HomeMain;
