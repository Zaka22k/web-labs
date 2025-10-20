import { Link } from "react-router-dom";
import styles from "./LabItem.module.css";

const LabItem = (props) => {
  const { link, title, subtitle } = props;

  return (
    <Link className={styles.labs_item} to={link}>
      <div className={styles.labs_item__title}>{title}</div>
      <div className={styles.labs_item__subtitle}>{subtitle}</div>
    </Link>
  );
};

export default LabItem;
