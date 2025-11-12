import {
  Hamburger,
  NavCategory,
  NavCategoryItem,
  NavDrawer,
  NavDrawerBody,
  NavDrawerFooter,
  NavDrawerHeader,
  NavItem,
  NavSectionHeader,
  NavSubItem,
  NavSubItemGroup,
  Persona,
} from "@fluentui/react-components";
import { Home20Regular } from "@fluentui/react-icons";
import { useNavigate, useParams } from "react-router-dom";

export default function Sidebar({ open, isMobile, onClose, data }) {
  const navigate = useNavigate();
  const { labId, taskId } = useParams();

  const selectedCategoryValue = labId ? `lab${labId}` : "";
  const selectedValue = labId && taskId ? `lab${labId}_task${taskId}` : "home";

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
      <NavDrawerBody>
        <NavItem
          value="home"
          onClick={() => navigate("/")}
          icon={<Home20Regular />}
        >
          Главная
        </NavItem>

        <NavSectionHeader>Лабораторные работы</NavSectionHeader>

        {data?.labs?.map((lab) => (
          <LabItem key={`lab-${lab.code}`} lab={lab} />
        ))}
      </NavDrawerBody>
      <NavDrawerFooter>
        <Persona
          style={{ marginBottom: "16px" }}
          avatar={{ color: "colorful" }}
          textAlignment="center"
          name={data.fullname}
          secondaryText={data.group}
          size="large"
        />
      </NavDrawerFooter>
    </NavDrawer>
  );
}

function LabItem({ lab }) {
  return (
    <NavCategory value={`lab${lab.code}`}>
      <NavCategoryItem value={`lab${lab.code}`}>
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
  const navigate = useNavigate();

  return (
    <NavSubItem value={value} onClick={() => navigate(path)}>
      {children}
    </NavSubItem>
  );
}
