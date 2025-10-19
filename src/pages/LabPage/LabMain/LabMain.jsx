import styles from "./LabMain.module.css";
import Card from "components/Card";
import TasksList from "../TasksList";
import { useOutletContext } from "react-router-dom";

const LabMain = () => {
  const { lab } = useOutletContext();

  return (
    <main className={styles.main}>
      <Card className={styles.student}>
        Пристёгин Семен Эдуардович <span>ИТ2204</span>
      </Card>
      <TasksList labId={lab.lab_id} tasksCount={lab.tasks} />
    </main>
  );
};

export default LabMain;
