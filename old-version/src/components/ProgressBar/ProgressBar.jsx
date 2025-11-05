import styles from "./ProgressBar.module.css";

const ProgressBar = ({ value, maxValue }) => {
  return (
    <progress
      className={styles.progressBar}
      value={value}
      max={maxValue}
    ></progress>
  );
};

export default ProgressBar;
