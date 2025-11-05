import { Link } from "react-router-dom";
import styles from "./TaskItem.module.css";

const TaskItem = (props) => {
  const { link, title } = props;

  return (
    <Link className={styles.task_item} to={link}>
      {title}
    </Link>
  );
};

export default TaskItem;
