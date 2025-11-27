import { Subtitle1, makeStyles, Card } from "@fluentui/react-components";

const useStyles = makeStyles({
  sectionContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  sectionContent: {
    borderRadius: "12px",
    padding: "16px",
  },
});

export default function HomeSection({ title, children }) {
  const styles = useStyles();

  return (
    <section className={styles.sectionContainer}>
      <Subtitle1>{title}</Subtitle1>
      <Card className={styles.sectionContent}>{children}</Card>
    </section>
  );
}
