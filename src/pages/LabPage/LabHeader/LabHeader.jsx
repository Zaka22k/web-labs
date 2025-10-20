import { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./LabHeader.module.css";
import Icon from "components/Icon";

const LabHeader = (props) => {
  const { data } = props;
  const { labId } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const handleChange = (e) => {
    navigate(`/labs/${e.target.value}`);
  };

  return (
    <header className={styles.header}>
      <div className={styles.home} onClick={() => navigate("/")}>
        <Icon>home</Icon>
      </div>
      <div className={styles.nav__container} ref={containerRef}>
        {data.map((lab, index) => (
          <div key={index} className={styles.option}>
            <input
              className={styles.input}
              type="radio"
              name="lab-selector"
              id={`lab-${index}`}
              value={lab.lab_id}
              checked={Number(labId) === lab.lab_id}
              onChange={handleChange}
            />
            <label className={styles.label} htmlFor={`lab-${index}`}>
              {`Лаб. ${lab.lab_id}`}
            </label>
          </div>
        ))}
      </div>
    </header>
  );
};

export default LabHeader;
