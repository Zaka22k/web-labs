import styles from "./TasksList.module.css";
import Card from "components/Card";
import TaskItem from "../TaskItem";
import Separator from "components/Separator";
import React from "react";

const TasksList = (props) => {
  const { labId, tasksCount } = props;
  const tasks = Array.from({ length: tasksCount });

  return (
    <Card className={styles.tasks__container}>
      <div
        className={styles.tasks__title}
      >{`Задания лабораторной работы №${labId}`}</div>
      <div className={styles.tasks__content}>
        {tasks.map((_, index) => (
          <React.Fragment key={index}>
            <TaskItem
              title={`Задание ${index + 1}`}
              link={`/labs/${labId}/tasks/${index + 1}`}
            />
            {index < tasks.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </div>
    </Card>
  );
};

export default TasksList;
