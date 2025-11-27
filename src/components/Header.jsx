import {
  Body1,
  Caption1,
  Divider,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import {
  Avatar,
  Button,
  Popover,
  PopoverTrigger,
  PopoverSurface,
  Hamburger,
  Subtitle2,
} from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useNotify } from "context";

const useStyles = makeStyles({
  header: {
    minHeight: "50px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "0px 12px",
    gap: "10px",
    justifyContent: "space-between",
  },
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
  },
  popoverContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "8px 16px",
    borderRadius: "8px",
  },
  profileBlock: {
    display: "flex",
    flexDirection: "row",
    gap: "8px",
    alignItems: "center",
  },
  infoBlock: {
    display: "flex",
    flexDirection: "column",
  },
});

function Header({ onToggle, data }) {
  const styles = useStyles();
  const { notifySuccess } = useNotify();
  const navigate = useNavigate();

  const handleLogout = () => {
    api.logout();
    notifySuccess({ info: "Вы вышли из системы" });
    navigate("/auth", { replace: true });
  };

  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <Hamburger onClick={onToggle} />
        <Subtitle2>Веб-инжиниринг</Subtitle2>
      </div>
      <Popover withArrow>
        <PopoverTrigger disableButtonEnhancement>
          <Avatar color="dark-red" name={data.fullname} />
        </PopoverTrigger>

        <PopoverSurface className={styles.popoverContainer} tabIndex={-1}>
          <div className={styles.profileBlock}>
            <Avatar size={48} color="dark-red" name={data.fullname} />
            <div className={styles.infoBlock}>
              <Body1>{data.fullname}</Body1>
              <Caption1 style={{ color: tokens.colorNeutralForeground2 }}>
                {data.group}
              </Caption1>
            </div>
          </div>
          <Divider />
          <Button onClick={handleLogout} appearance="transparent">
            Выйти
          </Button>
        </PopoverSurface>
      </Popover>
    </header>
  );
}

export default Header;
