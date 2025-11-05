import { useParams, useNavigate } from "react-router-dom";
import styles from "./LabHeader.module.css";
import Icon from "components/Icon";

const LabHeader = (props) => {
  const { data } = props;
  const { labId } = useParams();
  const navigate = useNavigate();

  const handleChange = ({ target: { value } }) => {
    if (value !== labId) navigate(`/labs/${value}`);
  };

  return (
    <header className={styles.header}>
      <div className={styles.home} onClick={() => navigate("/")}>
        <Icon>home</Icon>
      </div>
      <div className={styles.nav__container}>
        {data.map((lab, index) => (
          <div key={index} className={styles.option}>
            <input
              className={styles.input}
              type="radio"
              name="lab-selector"
              id={`lab-${index}`}
              value={lab.code}
              checked={Number(labId) === lab.code}
              onChange={handleChange}
            />
            <label className={styles.label} htmlFor={`lab-${index}`}>
              {`Лаб. ${lab.code}`}
            </label>
          </div>
        ))}
      </div>
    </header>
  );
};

export default LabHeader;
