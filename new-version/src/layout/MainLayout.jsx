import { Outlet } from "react-router-dom";
import Sidebar from "components/Sidebar";
import Header from "components/Header";
import {
  Button,
  makeStyles,
  Spinner,
  Title3,
  tokens,
} from "@fluentui/react-components";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useData } from "context/DataContext";

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
    backgroundColor: tokens.colorNeutralBackground2,
    borderTop: `1px solid ${tokens.colorNeutralStrokeOnBrand}`,
    borderLeft: `1px solid ${tokens.colorNeutralStrokeOnBrand}`,
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
  const { data, loading, error, reload } = useData();

  if (error) return <MainError onClick={reload} />;

  if (loading) return <MainLoad />;

  return (
    <div className={styles.pageWrapper}>
      <Header onToggle={() => setIsOpen(!isOpen)} name={data.fullname} />
      <div className={styles.mainWrapper}>
        <Sidebar
          open={isOpen}
          isMobile={isMobile}
          onClose={() => setIsOpen(false)}
          labs={data.labs}
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

function MainLoad() {
  const styles = useStyles();

  return (
    <Spinner
      className={styles.pageWrapper}
      size="large"
      labelPosition="below"
      label="Загрузка"
    />
  );
}

function MainError({ onClick }) {
  const styles = useStyles();

  return (
    <div className={styles.errorWrapper}>
      <Title3>Не удалось загрузить данные.</Title3>
      <Button onClick={onClick} shape="circular">
        Повторить
      </Button>
    </div>
  );
}
