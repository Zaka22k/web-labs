import { Outlet, useParams } from "react-router-dom";
import TaskHeader from "./TaskHeader";
import styles from "./TaskPage.module.css";
import PageTransition from "components/PageTransition";
import { useData } from "context/DataContext";

const TaskPage = () => {
  const { labId, taskId } = useParams();
  const { data } = useData();

  const labs = data?.labs || [];
  const lab = labs.find((l) => l.code === Number(labId));

  if (!lab) return null;

  return (
    <div className={styles.pageWrapper}>
      <TaskHeader lab={lab} />
      <PageTransition transitionKey={taskId}>
        <Outlet />
      </PageTransition>
    </div>
  );
};

export default TaskPage;
