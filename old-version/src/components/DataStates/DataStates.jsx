import styles from "./States.module.css";
import classNames from "classnames";
import { useData } from "context/DataContext";

export const LoadState = () => {
  return (
    <div className={classNames(styles.page_wrapper, styles.load)}>
      Загрузка...
    </div>
  );
};

export const ErrorState = () => {
  const { reload } = useData();

  return (
    <div className={classNames(styles.page_wrapper, styles.error)}>
      <div>Не удалось загрузить данные.</div>
      <button className={styles.error__btn} onClick={reload}>
        Повторить
      </button>
    </div>
  );
};
