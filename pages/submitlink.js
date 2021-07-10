import Layout from "../components/Layout";
import Form from "../components/Form";
import { fetchAPI } from "../lib/api";

const Submitlink = ({ categories, types, form }) => {
  return (
    <Layout seo={form.Seo} keywords={form.keywords} url={"/submitlink"}>
      <main>
        <Form categories={categories} types={types} />
      </main>
    </Layout>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [categories, types, form] = await Promise.all([
    fetchAPI("/categories"),
    fetchAPI("/types"),
    fetchAPI("/form"),
  ]);

  return {
    props: { categories, types, form },
    revalidate: 1,
  };
}

export default Submitlink;
