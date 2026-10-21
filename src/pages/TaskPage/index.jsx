import { makeStyles } from "@fluentui/react-components";
import useTaskPage from "./useTaskPage";
import { PageTemplate } from "components";

const useStyles = makeStyles({
  container: {
    position: "relative",
    flex: 1,
    overflow: "hidden",
  },
  iframe: {
    width: "100%",
    height: "100%",
    border: "none",
  },
});

export default function TaskPage() {
  const { labId, taskId, iframeRef } = useTaskPage();
  const styles = useStyles();

  return (
    <PageTemplate key={`${labId}-${taskId}`}>
      <div className={styles.container}>
        <iframe
          ref={iframeRef}
          src={`${import.meta.env.BASE_URL}${labId}/${taskId}/index.html`}
          className={styles.iframe}
          title={`${labId}-${taskId}`}
        />
      </div>
    </PageTemplate>
  );
}
