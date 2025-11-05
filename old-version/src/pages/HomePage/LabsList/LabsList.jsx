import styles from "./LabsList.module.css";
import Card from "components/Card";
import LabItem from "../LabItem";
import Separator from "components/Separator";
import React from "react";

const LabsList = (props) => {
  const { labs } = props;

  return (
    <Card className={styles.labs__container}>
      <div className={styles.labs__title}>Список работ</div>
      <div className={styles.labs__content}>
        {Object.values(labs).map((lab, index, arr) => (
          <React.Fragment key={index}>
            <LabItem
              title={`Лабораторная работа №${lab.code}`}
              subtitle={lab.title}
              link={`/labs/${lab.code}`}
              status={lab.status}
            />
            {index !== arr.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </div>
    </Card>
  );
};

export default LabsList;
