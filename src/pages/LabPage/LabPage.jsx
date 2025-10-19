import styles from "./LabPage.module.css";
import LabHeader from "./LabHeader";
import PageTransition from "components/PageTransition";
import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const LabPage = () => {
  const { labId } = useParams();
  const [lab, setLab] = useState({});
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    const saved = sessionStorage.getItem("labsData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setLabs(parsed);
      const current = parsed.find((l) => l.lab_id === Number(labId));
      setLab(current);
    }
  }, [labId]);

  return (
    <div className={styles.pageWrapper}>
      <LabHeader data={labs} />
      <PageTransition transitionKey={labId}>
        <Outlet context={{ lab }} />
      </PageTransition>
    </div>
  );
};

export default LabPage;
