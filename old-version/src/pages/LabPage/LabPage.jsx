import styles from "./LabPage.module.css";
import LabHeader from "./LabHeader";
import { Outlet, useParams } from "react-router-dom";
import { useData } from "context/DataContext";

const LabPage = () => {
  const { labId } = useParams();
  const { data } = useData();
  const profile = { fullname: data?.fullname, group: data?.group };

  const labs = data?.labs.filter((l) => l.type === "static") || [];
  const lab = labs.find((l) => l.code === Number(labId));

  return (
    <div className={styles.pageWrapper}>
      <LabHeader data={labs} />
      <Outlet context={{ lab, profile }} />
    </div>
  );
};

export default LabPage;
