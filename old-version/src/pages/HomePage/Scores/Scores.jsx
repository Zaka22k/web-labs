import styles from "./Scores.module.css";
import Card from "components/Card";

const Scores = (props) => {
  const { sql, python } = props;

  return (
    <Card className={styles.scores__container}>
      <div className={styles.scores__title}>Баллы на HackerRank</div>
      <div className={styles.scores__content}>
        <div>SQL ({sql})</div>
        <div>Python ({python})</div>
      </div>
    </Card>
  );
};

export default Scores;
