import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Card.module.css";

const Card = ({ category }) => {
  return (
    <Link href={`/${category.slug}`}>
      <a>
        <div className={styles.card}>
          <div>
            <Image
              src={category.image.formats.small.url}
              height={200}
              width={200}
              className={styles.imgCard}
              alt={category.image.name}
            />
          </div>
          <div className={styles.content}>
            <h1>{category.name}</h1>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
