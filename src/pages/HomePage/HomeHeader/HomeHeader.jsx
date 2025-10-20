import styles from "./HomeHeader.module.css";

const HomeHeader = (props) => {
  const { title } = props;

  return <header className={styles.header}>{title}</header>;
};

export default HomeHeader;
