import Link from "next/link";
import { FaLink, FaPlus } from "react-icons/fa";
import styles from "../styles/Header.module.css";

function Header() {
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div>
            <Link href="/">
              <a className={styles.logo}>
                LinkHut
                <FaLink />
              </a>
            </Link>
          </div>
          <div>
            <Link href="/submitlink">
              <a className={styles.btnAll}>
                <FaPlus />
                Submit Link
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
