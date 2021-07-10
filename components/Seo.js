import Head from "next/head";

const Seo = ({ seo, keywords, url }) => {
  const { metaTitle: title, metaDescription: description, shareImage } = seo;
  const Image = shareImage.media.url;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
      <meta name="keywords" content={keywords} />
      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twitter:card"
      />
      <meta property="og:url" content={url} key="og:url" />
      <meta property="og:title" content={title} key="og:title" />
      <meta
        property="og:description"
        content={description}
        key="og:description"
      />
      <meta property="og:image" content={Image} key="og:image" />
      <link rel="canonical" href={url} />
    </Head>
  );
};

export default Seo;
