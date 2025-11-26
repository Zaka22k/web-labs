import {
  AppItem,
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
  Button,
  Popover,
  PopoverTrigger,
  PopoverSurface,
} from "@fluentui/react-components";
import { Home20Regular } from "@fluentui/react-icons";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { useNotify } from "context";

export default function Sidebar({ open, isMobile, onClose, data }) {
  const navigate = useNavigate();
  const { labId, taskId } = useParams();
  const { notifySuccess } = useNotify();

  const selectedCategoryValue = labId ? `${labId}` : "";
  const selectedValue = labId && taskId ? `${labId}_${taskId}` : "home";

  const handleLogout = () => {
    api.logout();
    notifySuccess({ info: "Вы вышли из системы" });
    navigate("/auth", { replace: true });
  };

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
          onClick={() => navigate("/dashboard")}
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
        <Popover withArrow>
          <PopoverTrigger disableButtonEnhancement>
            <AppItem>
              <Persona
                avatar={{ color: "colorful" }}
                textAlignment="center"
                name={data.fullname}
                secondaryText={data.group}
                size="large"
              />
            </AppItem>
          </PopoverTrigger>

          <PopoverSurface tabIndex={-1} style={{ padding: "0px" }}>
            <Button onClick={handleLogout} appearance="transparent">
              Выйти
            </Button>
          </PopoverSurface>
        </Popover>
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
