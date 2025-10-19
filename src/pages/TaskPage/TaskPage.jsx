import { Outlet, useParams } from "react-router-dom";
import TaskHeader from "./TaskHeader";
import styles from "./TaskPage.module.css";
import { useState, useEffect } from "react";
import PageTransition from "components/PageTransition";

const TaskPage = () => {
  const { labId, taskId } = useParams();
  const [lab, setLab] = useState(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("labsData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setLab(parsed.find((l) => l.lab_id === Number(labId)));
    }
  }, [labId]);

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
