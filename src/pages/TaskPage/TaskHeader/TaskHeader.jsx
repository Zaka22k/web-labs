import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Icon from "components/Icon";
import Card from "components/Card";
import styles from "./TaskHeader.module.css";

const TaskHeader = ({ lab }) => {
  const { labId, taskId } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const tasks = Array.from({ length: lab.tasks }, (_, index) => index + 1);

  const handleChange = (e) => {
    e.stopPropagation();
    navigate(e.target.value);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
      <Card
        className={styles.home}
        onCardClick={() => navigate(`/labs/${labId}/`)}
      >
        <Icon>arrow_back</Icon>
      </Card>

      <div ref={wrapperRef}>
        <Card
          className={`${styles.nav__container} ${open ? styles.open : ""}`}
          onCardClick={() => setOpen(!open)}
        >
          {!open && (
            <div className={styles.nav__currentTask}>{`Задание ${taskId}`}</div>
          )}

          <motion.div
            className={`${styles.dropdown} ${open ? styles.open : ""}`}
            initial={false}
            animate={{
              maxHeight: open ? "500px" : "0px",
              opacity: open ? 1 : 0,
              minWidth: open ? "250px" : "125px",
            }}
            transition={{
              duration: 0.25,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {tasks.map((index) => {
              const isChecked = Number(taskId) === index;
              return (
                <label
                  key={index}
                  htmlFor={`segment-${index}`}
                  className={`${styles.label} ${
                    isChecked ? styles.active : ""
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    className={styles.input}
                    type="radio"
                    id={`segment-${index}`}
                    name="task-selector"
                    checked={isChecked}
                    value={`/labs/${lab.lab_id}/tasks/${index}`}
                    onChange={handleChange}
                  />
                  {`Задание ${index}`}
                </label>
              );
            })}
          </motion.div>
        </Card>
      </div>
    </header>
  );
};

export default TaskHeader;
