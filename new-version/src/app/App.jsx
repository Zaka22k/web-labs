import { makeStyles, tokens } from "@fluentui/react-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "layout/MainLayout";
import { TaskPage, HomePage } from "pages";
import { DataProvider } from "context/DataContext";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground4,
  },
});

function App() {
  const styles = useStyles();

  return (
    <DataProvider>
      <div className={styles.root}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="lab/:labId/task/:taskId" element={<TaskPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </DataProvider>
  );
}

export default App;
