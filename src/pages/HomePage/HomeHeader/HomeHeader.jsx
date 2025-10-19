import styles from "./HomeHeader.module.css";

const HomeHeader = ({ title }) => {
  return <header className={styles.header}>{title}</header>;
};

export default HomeHeader;
