import { createContext } from "react";
import Header from "./Header";
import Seo from "./Seo";

export const SeoContext = createContext({});

const Layout = ({ children, seo, keywords, url }) => {
  return (
    <>
      <Seo seo={seo} keywords={keywords} url={url} />
      <Header />
      {children}
      <footer>
        <p>
          © 2021 {process.env.NEXT_PUBLIC_FRONTEND_URL}. All Rights Resereved.{" "}
        </p>
        <p>This website is not affiliated with WhatsApp or Telegram.</p>
      </footer>
    </>
  );
};

export default Layout;
