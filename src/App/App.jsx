import styles from "./App.module.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./AppRouter";

function App() {
  return (
    <Router>
      <div className={styles.pageWrapper}>
        <div className={styles.homepage}></div>
        <AppRouter />
      </div>
    </Router>
  );
}

export default App;
