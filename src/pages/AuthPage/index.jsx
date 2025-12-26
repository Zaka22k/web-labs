import {
  InfoLabel,
  makeStyles,
  Subtitle2,
  Title3,
  tokens,
} from "@fluentui/react-components";
import { PageTemplate, TextBox, SubmitButton } from "components";
import useAuthPage from "./useAuthPage";
import pageImage from "assets/fluent_web.svg";

const useStyles = makeStyles({
  pageWrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${pageImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "400px",
    gap: "8px",
    backgroundColor: tokens.colorNeutralBackground3,
    padding: "32px",
    borderRadius: "12px",
    boxShadow: tokens.shadow28,
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  button: {
    marginTop: "24px",
    alignSelf: "end",
  },
});

export default function AuthPage() {
  const { loading, formData, setFormData, handleSubmit } = useAuthPage();
  const styles = useStyles();

  return (
    <PageTemplate>
      <div className={styles.pageWrapper}>
        <div className={styles.cardContainer}>
          <Subtitle2 style={{ color: tokens.colorNeutralForeground2 }}>
            Веб-инжиниринг
          </Subtitle2>

          <form className={styles.formContainer} onSubmit={handleSubmit}>
            <InfoLabel
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
              info="Данные для входа на мой сервер"
            >
              <Title3>Вход</Title3>
            </InfoLabel>

            <TextBox
              placeholder="Логин"
              value={formData.login}
              required
              onChange={(e, d) => setFormData({ ...formData, login: d.value })}
            />
            <TextBox
              placeholder="Пароль"
              value={formData.password}
              type="password"
              required
              onChange={(e, d) =>
                setFormData({ ...formData, password: d.value })
              }
            />
            <SubmitButton
              className={styles.button}
              loading={loading}
              appearance="primary"
            >
              Войти
            </SubmitButton>
          </form>
        </div>
      </div>
    </PageTemplate>
  );
}
