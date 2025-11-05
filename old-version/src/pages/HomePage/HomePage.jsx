import HomeFooter from "./HomeFooter/HomeFooter";
import HomeHeader from "./HomeHeader/HomeHeader";
import styles from "./HomePage.module.css";
import HomeMain from "./HomeMain/HomeMain";

const HomePage = () => {
  return (
    <div className={styles.pageWrapper}>
      <HomeHeader title={"Web-инжиниринг"} />
      <HomeMain />
      <HomeFooter
        title={
          "© 2025 «Кубанский государственный аграрный университет имени И. Т. Трубилина»"
        }
      />
    </div>
  );
};

export default HomePage;
