import { useState } from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { fetchAPI } from "../lib/api";
import styles from "../styles/Telegram.module.css";
import { FaSearch } from "react-icons/fa";

export default function Home({ categories, homepage }) {
  const [data, setData] = useState(categories);
  const handleChange = (e) => {
    if (e.target.value === "") {
      return setData(categories);
    }
    setData(
      data.filter((val) => {
        return val.name.toUpperCase().includes(e.target.value.toUpperCase());
      })
    );
  };
  return (
    <Layout seo={homepage.Seo} keywords={homepage.keywords} url={"/"}>
      <div className={styles.container}>
        <div className={styles.btnContainer}>
          <h1>CATEGORY OF LINKS</h1>
          <div className={styles.searchBox}>
            <button className={styles.btnSearch}>
              <FaSearch />
              {/* <i className={styles.fas fa-search"></i> */}
            </button>
            <input
              type="text"
              className={styles.inputSearch}
              placeholder="Type to Search..."
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.wrapper}>
          {data.map((category, index) => {
            return <Card category={category} key={index} />;
          })}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [categories, homepage] = await Promise.all([
    fetchAPI("/categories"),
    fetchAPI("/homepage"),
  ]);

  return {
    props: { categories, homepage },
    revalidate: 1,
  };
}
