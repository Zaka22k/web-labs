import {
  Hamburger,
  NavCategory,
  NavCategoryItem,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem,
  NavSectionHeader,
  NavSubItem,
  NavSubItemGroup,
  Text,
  Tooltip,
} from "@fluentui/react-components";
import { Home20Regular } from "@fluentui/react-icons";
import { useNavigate, useParams } from "react-router-dom";

export default function Sidebar({ open, isMobile, onClose, labs }) {
  const navigate = useNavigate();
  const { labId, taskId } = useParams();

  const selectedCategoryValue = labId ? `${labId}` : "";
  const selectedValue = labId && taskId ? `${labId}_${taskId}` : "home";

  return (
    <NavDrawer
      open={open}
      type={isMobile ? "overlay" : "inline"}
      multiple={false}
      selectedCategoryValue={selectedCategoryValue}
      selectedValue={selectedValue}
    >
      {isMobile && (
        <NavDrawerHeader>
          <Hamburger onClick={onClose} />
        </NavDrawerHeader>
      )}
      <NavDrawerBody style={{ flex: 1, overflowY: "auto" }}>
        <NavItem
          value="home"
          onClick={() => navigate("/dashboard")}
          icon={<Home20Regular />}
        >
          Главная
        </NavItem>

        <NavSectionHeader>Лабораторные работы</NavSectionHeader>

        {labs?.map((lab) => (
          <LabItem key={`lab-${lab.code}`} lab={lab} />
        ))}
      </NavDrawerBody>
    </NavDrawer>
  );
}

function LabItem({ lab }) {
  return (
    <NavCategory value={`lab${lab.code}`}>
      <Tooltip content={lab.title}>
        <NavCategoryItem value={`lab${lab.code}`}>
          <Text truncate wrap={false}>{`${lab.code}. ${lab.title}`}</Text>
        </NavCategoryItem>
      </Tooltip>
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
          path={`/dashboard/lab${lab.code}/task${taskIndex + 1}`}
        >
          {`Задание ${taskIndex + 1}`}
        </TaskItem>
      ))}
    </NavSubItemGroup>
  );
}

function TaskItem({ value, path, children }) {
  const navigate = useNavigate();

  return (
    <NavSubItem value={value} onClick={() => navigate(path)}>
      {children}
    </NavSubItem>
  );
}
