import styles from "./HomeFooter.module.css";

const HomeFooter = ({ title }) => {
  return <footer className={styles.footer}>{title}</footer>;
};

export default HomeFooter;
