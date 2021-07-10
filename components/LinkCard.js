import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { getStrapiURL } from "../lib/api";
import styles from "../styles/LinkCard.module.css";

const LinkCard = ({ link }) => {
  const handleClick = async () => {
    const data = {
      click: link.click + 1,
    };

    const res = await fetch(getStrapiURL(`/links/${link.id}`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      console.log("error");
    }
  };

  return (
    <Link href={link.link}>
      <a target="_blank" rel="noopener noreferrer" onClick={handleClick}>
        <div
          className={styles.card}
          style={{ backgroundColor: link.type === 3 ? "#0088CC" : "#075E54" }}
        >
          <div className={styles.content}>
            <h1>{link.name}</h1>
            <p>{link.description}</p>
          </div>
          <div className={styles.click}>
            <FaEye />
            <span> click : {link.click}</span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default LinkCard;
