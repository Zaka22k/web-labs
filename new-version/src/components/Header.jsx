import { Hamburger, Persona, Subtitle2 } from "@fluentui/react-components";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  header: {
    minHeight: "50px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "0px 12px",
    gap: "10px",
  },
});

function Header({ onToggle }) {
  const styles = useStyles();

  return (
    <header className={styles.header}>
      <Hamburger onClick={onToggle} />
      <Subtitle2>Веб-инжиниринг</Subtitle2>
    </header>
  );
}

export default Header;
