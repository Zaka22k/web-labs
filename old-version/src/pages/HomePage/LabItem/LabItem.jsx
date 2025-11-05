import { Link } from "react-router-dom";
import styles from "./LabItem.module.css";
import classNames from "classnames";

const LabItem = (props) => {
  const { link, title, subtitle, status } = props;

  const statusInfo = {
    COMPLETED: { className: styles.status_completed, text: "Выполнено" },
    IN_PROGRESS: { className: styles.status_in_progress, text: "В процессе" },
    NOT_STARTED: { className: styles.status_not_started, text: "Не начата" },
  };

  const currentStatus = statusInfo[status] || {
    className: styles.status_not_started,
    text: "Неизвестно",
  };

  return (
    <Link className={styles.labs_item} to={link}>
      <div className={styles.labs_item__content}>
        <div className={styles.labs_item__title}>{title}</div>
        <div className={styles.labs_item__subtitle}>
          {subtitle ?? "Без названия"}
        </div>
      </div>
      <div
        className={classNames(
          styles.labs_item__status,
          currentStatus.className
        )}
      >
        {currentStatus.text}
      </div>
    </Link>
  );
};

export default LabItem;
