import { Outlet } from "react-router-dom";
import { Header, Sidebar, PageLoader } from "components";
import { makeStyles, tokens } from "@fluentui/react-components";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useData } from "context";

const useStyles = makeStyles({
  pageWrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  mainWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
  },
  content: {
    flex: 1,
    backgroundColor: tokens.colorNeutralBackground3,
    borderTop: `1px solid ${tokens.colorNeutralStrokeSubtle}`,
    borderLeft: `1px solid ${tokens.colorNeutralStrokeSubtle}`,
    borderRight: "none",
    borderBottom: "none",
    "@media (max-width: 768px)": {
      borderTopLeftRadius: "0px",
      border: "none",
    },
    overflow: "hidden",
    display: "flex",
  },
  errorWrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
  },
});

export default function MainLayout() {
  const styles = useStyles();
  const [isOpen, setIsOpen] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { data, loading } = useData();

  if (loading) return <PageLoader />;

  return (
    <div className={styles.pageWrapper}>
      <Header onToggle={() => setIsOpen(!isOpen)} name={data.fullname} />
      <div className={styles.mainWrapper}>
        <Sidebar
          open={isOpen}
          isMobile={isMobile}
          onClose={() => setIsOpen(false)}
          data={data}
        />
        <main
          className={styles.content}
          style={{ borderTopLeftRadius: isOpen ? "16px" : "0px" }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
