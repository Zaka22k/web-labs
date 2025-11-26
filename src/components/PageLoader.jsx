import { makeStyles, Spinner } from "@fluentui/react-components";

const useStyles = makeStyles({
  pageWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "24px",
    gap: "20px",
  },
});

const PageLoader = () => {
  const styles = useStyles();
  return <Spinner size="large" className={styles.pageWrapper} />;
};

export default PageLoader;
