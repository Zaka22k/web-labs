import styles from "./LabMain.module.css";
import Card from "components/Card";
import TasksList from "../TasksList";
import { useOutletContext } from "react-router-dom";
import PageTransition from "components/PageTransition";

const LabMain = () => {
  const { lab, profile } = useOutletContext();

  return (
    <main className={styles.main}>
      <Card className={styles.student}>
        {profile.fullname} <span>{profile.group}</span>
      </Card>
      <PageTransition transitionKey={lab.lab_id}>
        <TasksList labId={lab.lab_id} tasksCount={lab.tasks} />
      </PageTransition>
    </main>
  );
};

export default LabMain;
