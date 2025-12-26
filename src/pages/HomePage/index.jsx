import { PageTemplate } from "components";
import useHomePage from "./useHomePage";
import { Profile, Progress, Scores } from "./Sections";

export default function HomePage() {
  const { navigate, data, labCount, sql, python } = useHomePage();

  return (
    <PageTemplate>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "24px",
          flex: 1,
          maxWidth: "950px",
          width: "100%",
          gap: "32px",
          margin: "0 auto",
        }}
      >
        <Profile
          fullname={data.fullname}
          group={data.group}
          onLinkClick={() => navigate("/dashboard/lab1/task10")}
        />

        <Progress labCount={labCount} />

        <Scores sql={sql} python={python} updated_at={data.updated_at} />
      </div>
    </PageTemplate>
  );
}
