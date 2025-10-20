import styles from "./HomeMain.module.css";
import Profile from "../Profile/Profile";
import Scores from "../Scores/Scores";
import LabsList from "../LabsList/LabsList";
import LoadState from "components/LoadState";
import { useData } from "context/DataContext";
import React from "react";

const HomeMain = React.memo(() => {
  const { data } = useData();

  if (!data) return <LoadState />;

  return (
    <main className={styles.main}>
      <Profile
        {...data.profile}
        updated_at={data.hacker_rank_stats.updated_at}
      />
      <LabsList labs={data.labs} />
      <Scores {...data.hacker_rank_stats} />
    </main>
  );
});

export default HomeMain;
