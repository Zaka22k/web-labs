import {
  Body1,
  Body2,
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
import avatarImg from "assets/avatar.jpg";

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
        <Subtitle2>Основы Web-инжиниринга</Subtitle2>
      </div>
      <Popover withArrow>
        <PopoverTrigger disableButtonEnhancement>
          <Avatar
            image={{ src: avatarImg }}
            color="dark-red"
            size={32}
            name={data.fullname}
          />
        </PopoverTrigger>

        <PopoverSurface className={styles.popoverContainer} tabIndex={-1}>
          <div className={styles.profileBlock}>
            <Avatar
              size={48}
              image={{ src: avatarImg }}
              color="dark-red"
              name={data.fullname}
            />
            <div className={styles.infoBlock}>
              <Body2>{data.fullname}</Body2>
              <Body1 style={{ color: tokens.colorNeutralForeground2 }}>
                {data.group}
              </Body1>
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
