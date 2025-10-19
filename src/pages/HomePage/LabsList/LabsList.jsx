import styles from "./LabsList.module.css";
import Card from "components/Card";
import LabItem from "../LabItem";
import Separator from "components/Separator";
import React from "react";
import CircularProgress from "components/CircularProgress";

const LabsList = ({ labs }) => {
  return (
    <Card className={styles.labs__container}>
      <div className={styles.labs__title}>
        Завершённые работы
        <div>
          <CircularProgress size={22} strokeWidth={3} max={12} value={5} />
          {`${labs.filter((lab) => lab.completed).length} из 12`}
        </div>
      </div>
      <div className={styles.labs__content}>
        {Object.values(labs).map((lab, index, arr) => (
          <React.Fragment key={index}>
            <LabItem
              title={`Лабораторная работа №${lab.lab_id}`}
              subtitle={lab.title}
              link={`/labs/${lab.lab_id}`}
            />
            {index !== arr.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </div>
    </Card>
  );
};

export default LabsList;
