import styles from "./Profile.module.css";
import Card from "components/Card";
import { formatDate } from "utils/FormatDate";

const Profile = (props) => {
  const { fullname, group, updated_at } = props;

  return (
    <Card className={styles.profile__container}>
      <div className={styles.profile__fullname}>
        {fullname}
        <br />
        <span className={styles.profile__group}>{group}</span>
        <br />
        <a href="/labs/1/tasks/10/">Задание 10 ⟶</a>
      </div>
      <div className={styles.profile__update_at}>
        Дата обновления: {formatDate(updated_at)}
      </div>
    </Card>
  );
};

export default Profile;
