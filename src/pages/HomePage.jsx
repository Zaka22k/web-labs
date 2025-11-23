import {
  Body2,
  Body1,
  makeStyles,
  Subtitle1,
  tokens,
  Link,
  RatingDisplay,
} from "@fluentui/react-components";
import { useData } from "context/DataContext";
import { useNavigate } from "react-router-dom";
import { PageTemplate } from "components";

const useStyles = makeStyles({
  pageWrapper: {
    display: "flex",
    flexDirection: "column",
    padding: "36px",
    flex: 1,
    maxWidth: "800px",
    gap: "24px",
    margin: "0 auto",
  },
  sectionContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  sectionContent: {
    backgroundColor: tokens.colorNeutralBackground2,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "16px",
  },
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileInfoContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  progressContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  scoreContainer: {
    display: "flex",
    gap: "24px",
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
        <HomeSection className={styles.profileContainer} title="Профиль">
          <div className={styles.profileInfoContainer}>
            <Body2>{data.fullname}</Body2>
            <Body1 style={{ color: tokens.colorNeutralForeground2 }}>
              {data.group}
            </Body1>
          </div>
          <Link onClick={() => navigate("/lab/1/task/10")}>Задание 10</Link>
        </HomeSection>

        <HomeSection
          className={styles.progressContainer}
          title="Прогресс по работам"
        >
          <Body2>Сдано</Body2>
          <RatingDisplay
            count={12}
            color="brand"
            value={labCount}
            max={12}
          ></RatingDisplay>
        </HomeSection>

        <HomeSection title="Баллы на HackerRank">
          <div className={styles.scoreContainer}>
            <Body2>{`SQL - ${sql}`}</Body2>
            <Body2>{`Python - ${python}`}</Body2>
          </div>
          <Body1 style={{ color: tokens.colorNeutralForeground2 }}>
            Обновлено {data.updated_at}
          </Body1>
        </HomeSection>
      </div>
    </PageTemplate>
  );
}

function HomeSection({ className, title, children }) {
  const styles = useStyles();

  return (
    <section className={styles.sectionContainer}>
      <Subtitle1>{title}</Subtitle1>
      <div className={`${styles.sectionContent} ${className}`}>{children}</div>
    </section>
  );
}
