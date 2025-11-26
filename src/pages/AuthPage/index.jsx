import { makeStyles, Title2 } from "@fluentui/react-components";
import { PageTemplate, TextBox, SubmitButton } from "components";
import useAuthPage from "./useAuthPage";

const useStyles = makeStyles({
  pageWrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "32px",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
    maxWidth: "350px",
  },
  button: {
    marginTop: "10px",
  },
});

export default function AuthPage() {
  const { loading, formData, setFormData, handleSubmit } = useAuthPage();
  const styles = useStyles();

  return (
    <PageTemplate>
      <div className={styles.pageWrapper}>
        <Title2>Добро пожаловать</Title2>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <TextBox
            value={formData.login}
            label="Логин"
            required
            onChange={(e, d) => setFormData({ ...formData, login: d.value })}
          />
          <TextBox
            value={formData.password}
            label="Пароль"
            type="password"
            required
            onChange={(e, d) => setFormData({ ...formData, password: d.value })}
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
    </PageTemplate>
  );
}
