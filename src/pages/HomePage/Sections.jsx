import {
  Body1,
  Subtitle2,
  makeStyles,
  tokens,
  Link,
  RatingDisplay,
} from "@fluentui/react-components";
import HomeSection from "./HomeSection";

const useStyles = makeStyles({
  profileContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
  },

  profileInfoContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  progressContainer: {
    display: "flex",
    gap: "8px",
  },

  scoreContainer: {
    display: "flex",
    gap: "32px",
  },

  scoreBlock: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "8px",
  },
});

export function Profile({ fullname, group, onLinkClick }) {
  const styles = useStyles();

  return (
    <HomeSection title="Профиль">
      <div className={styles.profileContainer}>
        <div className={styles.profileInfoContainer}>
          <Subtitle2>{fullname}</Subtitle2>
          <Body1 style={{ color: tokens.colorNeutralForeground2 }}>
            {group}
          </Body1>
        </div>

        <Link onClick={onLinkClick}>Перейти к заданию 10 →</Link>
      </div>
    </HomeSection>
  );
}

export function Progress({ labCount }) {
  const styles = useStyles();

  return (
    <HomeSection title="Прогресс по работам">
      <div className={styles.progressContainer}>
        <Body1>Сдано</Body1>
        <RatingDisplay count={11} color="brand" value={labCount} max={11} />
      </div>
    </HomeSection>
  );
}

export function Scores({ sql, python, updated_at }) {
  const styles = useStyles();

  return (
    <HomeSection title="Баллы на HackerRank">
      <div className={styles.scoreContainer}>
        <div className={styles.scoreBlock}>
          <Body1 style={{ color: tokens.colorNeutralForeground2 }}>SQL</Body1>
          <Subtitle2>{sql}</Subtitle2>
        </div>

        <div className={styles.scoreBlock}>
          <Body1 style={{ color: tokens.colorNeutralForeground2 }}>
            Python
          </Body1>
          <Subtitle2>{python}</Subtitle2>
        </div>
      </div>

      <Body1
        style={{
          color: tokens.colorNeutralForeground2,
        }}
      >
        Обновлено{" "}
        <Body1
          style={{
            color: tokens.colorNeutralForeground1,
          }}
        >
          {updated_at}
        </Body1>
      </Body1>
    </HomeSection>
  );
}
