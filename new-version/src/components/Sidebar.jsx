import {
  Hamburger,
  makeStyles,
  NavCategory,
  NavCategoryItem,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem,
  NavSectionHeader,
  NavSubItem,
  NavSubItemGroup,
  tokens,
} from "@fluentui/react-components";
import { Home20Regular } from "@fluentui/react-icons";
import { useNavigate, useParams } from "react-router-dom";

const useStyles = makeStyles({
  nav: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
});

export default function Sidebar({ open, isMobile, onClose, labs }) {
  const styles = useStyles();
  const navigate = useNavigate();
  const { labId, taskId } = useParams();

  const selectedCategoryValue = labId ? `lab${labId}` : "";
  const selectedValue = labId && taskId ? `lab${labId}_task${taskId}` : "home";

  return (
    <NavDrawer
      open={open}
      type={isMobile ? "overlay" : "inline"}
      multiple={false}
      className={styles.nav}
      selectedCategoryValue={selectedCategoryValue}
      selectedValue={selectedValue}
    >
      {isMobile && (
        <NavDrawerHeader>
          <Hamburger onClick={onClose} />
        </NavDrawerHeader>
      )}
      <NavDrawerBody>
        <NavItem
          value="home"
          onClick={() => navigate("/")}
          className={styles.nav}
          icon={<Home20Regular />}
        >
          Главная
        </NavItem>

        <NavSectionHeader>Лабораторные работы</NavSectionHeader>

        {labs.map((lab) => (
          <LabItem key={`lab-${lab.code}`} lab={lab} />
        ))}
      </NavDrawerBody>
    </NavDrawer>
  );
}

function LabItem({ lab }) {
  const styles = useStyles();

  return (
    <NavCategory value={`lab${lab.code}`}>
      <NavCategoryItem value={`lab${lab.code}`} className={styles.nav}>
        {`${lab.code}. ${lab.title}`}
      </NavCategoryItem>
      <TaskList lab={lab} />
    </NavCategory>
  );
}

function TaskList({ lab }) {
  return (
    <NavSubItemGroup>
      {Array.from({ length: lab.tasks }, (_, taskIndex) => (
        <TaskItem
          key={`lab-${lab.code}-task-${taskIndex + 1}`}
          value={`lab${lab.code}_task${taskIndex + 1}`}
          path={`/lab/${lab.code}/task/${taskIndex + 1}`}
        >
          {`Задание ${taskIndex + 1}`}
        </TaskItem>
      ))}
    </NavSubItemGroup>
  );
}

function TaskItem({ value, path, children }) {
  const styles = useStyles();
  const navigate = useNavigate();

  return (
    <NavSubItem
      value={value}
      onClick={() => navigate(path)}
      className={styles.nav}
    >
      {children}
    </NavSubItem>
  );
}
