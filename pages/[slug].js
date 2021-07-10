import { useRouter } from "next/router";
import { useState } from "react";
import { FaCircle, FaSearch, FaTelegram, FaWhatsapp } from "react-icons/fa";
import Layout from "../components/Layout";
import LinkCard from "../components/LinkCard";
import { fetchAPI } from "../lib/api";
import styles from "../styles/Telegram.module.css";

const Links = ({ category }) => {
  const router = useRouter();
  const { slug } = router.query;
  const data = category.links;
  const [fildata, setFildata] = useState(data);
  const [search, setSearch] = useState("");

  const handleSubmit = (num) => {
    setFildata(
      data.filter((val) => {
        return val.type === num;
      })
    );
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = () => {
    setFildata(
      data.filter((val) => {
        return val.description.includes(search.toUpperCase());
      })
    );
    setSearch("");
  };

  const handleClear = () => {
    setFildata(data);
  };

  return (
    <Layout seo={category.seo} keywords={category.keywords} url={`/${slug}`}>
      <div className={styles.container}>
        <div className={styles.btnContainer}>
          <button className={styles.btnTele} onClick={() => handleSubmit(3)}>
            <FaTelegram />
            TELEGRAM
          </button>
          <button
            className={styles.btnWhatsapp}
            onClick={() => handleSubmit(2)}
          >
            <FaWhatsapp />
            WHATSAPP
          </button>
          <button className={styles.btnAll} onClick={handleClear}>
            <FaCircle />
            All
          </button>
          <div className={styles.searchBox}>
            <button className={styles.btnSearch}>
              <FaSearch onClick={handleSearchSubmit} />
              {/* <i className={styles.fas fa-search"></i> */}
            </button>
            <input
              type="text"
              className={styles.inputSearch}
              value={search}
              placeholder="Type to Search..."
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className={styles.wrapper}>
          {fildata.map((link, index) => {
            return <LinkCard link={link} key={index} />;
          })}
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const types = await fetchAPI("/categories");

  // Get the paths we want to pre-render based on posts
  const paths = types.map((type) => ({
    params: { slug: type.slug.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Run API calls in parallel
  const categories = await fetchAPI(`/categories?slug=${params.slug}`);

  return {
    props: { category: categories[0] },
    revalidate: 1,
  };
}

export default Links;
