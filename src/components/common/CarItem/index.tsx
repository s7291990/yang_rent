import React from 'react';
import styles from './index.module.css';
import Link from 'next/link';

interface InputProps {
  title?: string;
  desc?: string;
  type?: string[];
  image?: string;
  price?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function CarItem({
  title = '',
  desc,
  type,
  image = '',
  price,
  onClick,
}: InputProps) {
  return (
    <li className={styles.carListItem}>
      <Link href="#" onClick={onClick}>
        <div className={styles.title}>{title}</div>
        {desc && <div className={styles.desc}>{desc}</div>}
        {type && (
          <div className={styles.type}>
            {type.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </div>
        )}

        <div className={styles.image}>
          <img src={image} />
        </div>
        {price && (
          <div className={styles.price}>
            <strong>{price}</strong>
            <span>/일</span>
          </div>
        )}
      </Link>
    </li>
  );
}
