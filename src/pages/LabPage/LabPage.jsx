import styles from "./LabPage.module.css";
import LabHeader from "./LabHeader";
import PageTransition from "components/PageTransition";
import { Outlet, useParams } from "react-router-dom";
import { useData } from "context/DataContext";

const LabPage = () => {
  const { labId } = useParams();
  const { data } = useData();

  const labs = data?.labs || [];
  const lab = labs.find((l) => l.lab_id === Number(labId));

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
