import { Hamburger, Persona, Subtitle2 } from "@fluentui/react-components";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  header: {
    minHeight: "50px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "0px 12px",
    justifyContent: "space-between",
  },
  headerTitle: {
    display: "flex",
    flexDirection: "row",
    gap: "8px",
    alignItems: "center",
  },
});

function Header({ name, onToggle }) {
  const styles = useStyles();

  return (
    <header className={styles.header}>
      <div className={styles.headerTitle}>
        <Hamburger onClick={onToggle} />
        <Subtitle2>Веб-инжиниринг</Subtitle2>
      </div>
      <Persona
        avatar={{ color: "colorful" }}
        textAlignment="center"
        name={name}
      />
    </header>
  );
}

export default Header;
