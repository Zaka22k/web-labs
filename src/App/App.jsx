import styles from "./App.module.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./AppRouter";
import { DataProvider } from "context/DataContext";

function App() {
  return (
    <DataProvider>
      <Router>
        <div className={styles.pageWrapper}>
          <div className={styles.homepage}></div>
          <AppRouter />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
