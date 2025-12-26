import { Outlet } from "react-router-dom";
import { Header, Sidebar, PageLoader } from "components";
import { makeStyles, tokens } from "@fluentui/react-components";
import { useState, Suspense } from "react";
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
    margin: "0px 8px 8px 0px",
    backgroundColor: tokens.colorNeutralBackground3,
    border: `1px solid ${tokens.colorNeutralStrokeSubtle}`,
    "@media (max-width: 768px)": {
      border: "none",
      margin: "0px",
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

export default function Dashboard() {
  const styles = useStyles();
  const [isOpen, setIsOpen] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { data, loading } = useData();

  if (loading) return <PageLoader />;

  return (
    <div className={styles.pageWrapper}>
      <Header onToggle={() => setIsOpen(!isOpen)} data={data} />
      <div className={styles.mainWrapper}>
        <Sidebar
          open={isOpen}
          isMobile={isMobile}
          onClose={() => setIsOpen(false)}
          labs={data.labs}
        />
        <main
          className={styles.content}
          style={
            isOpen
              ? {
                  borderRadius: "16px",
                  border: `1px solid ${tokens.colorNeutralStrokeSubtle}`,
                  margin: "0px 8px 8px 0px",
                }
              : {
                  borderRadius: "0px",
                  border: "none",
                  margin: "0px",
                }
          }
        >
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
