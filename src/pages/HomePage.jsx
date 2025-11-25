import {
  Body2,
  Body1,
  Subtitle1,
  Subtitle2,
  makeStyles,
  tokens,
  Link,
  RatingDisplay,
  Card,
} from "@fluentui/react-components";
import { useData } from "context/DataContext";
import { useNavigate } from "react-router-dom";
import { PageTemplate } from "components";

const useStyles = makeStyles({
  pageWrapper: {
    display: "flex",
    flexDirection: "column",
    padding: "24px",
    flex: 1,
    maxWidth: "950px",
    width: "100%",
    boxSizing: "border-box",
    gap: "32px",
    margin: "0 auto",
  },

  sectionContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  sectionContent: {
    borderRadius: "12px",
    padding: "16px",
  },

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

export default function HomePage() {
  const { data } = useData();
  const styles = useStyles();
  const navigate = useNavigate();

  const labCount = data.labs.length;
  const { sql, python } = data.hackerrank_stats;

  return (
    <PageTemplate>
      <div className={styles.pageWrapper}>
        <HomeSection title="Профиль">
          <div className={styles.profileContainer}>
            <div className={styles.profileInfoContainer}>
              <Subtitle2>{data.fullname}</Subtitle2>
              <Body1 style={{ color: tokens.colorNeutralForeground2 }}>
                {data.group}
              </Body1>
            </div>

            <Link onClick={() => navigate("/lab/1/task/10")}>
              Перейти к заданию 10
            </Link>
          </div>
        </HomeSection>

        <HomeSection title="Прогресс по работам">
          <div className={styles.progressContainer}>
            <Body1>Сдано</Body1>
            <RatingDisplay count={12} color="brand" value={labCount} max={12} />
          </div>
        </HomeSection>

        <HomeSection title="Баллы на HackerRank">
          <div className={styles.scoreContainer}>
            <div className={styles.scoreBlock}>
              <Body1 style={{ color: tokens.colorNeutralForeground2 }}>
                SQL
              </Body1>
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
            Обновлено {data.updated_at}
          </Body1>
        </HomeSection>
      </div>
    </PageTemplate>
  );
}

function HomeSection({ title, children }) {
  const styles = useStyles();

  return (
    <section className={styles.sectionContainer}>
      <Subtitle1>{title}</Subtitle1>
      <Card className={styles.sectionContent}>{children}</Card>
    </section>
  );
}
