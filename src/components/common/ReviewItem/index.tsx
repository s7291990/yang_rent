import React from 'react';
import styles from './index.module.css';

interface InputProps {
  title?: string;
  desc?: string;
  image?: string;
  name?: string;
  car?: string;
  onClick?: () => void;
}

export default function index({ title = '', desc, image = '', name, car, onClick }: InputProps) {
  return (
    <div className={styles.reviewItem} onClick={onClick}>
      <div className={styles.subject}>{title}</div>
      <div className={styles.desc}>{desc}</div>
      <div className={styles.colsItem}>
        <div className={styles.profile}>
          <img src={image} />
        </div>
        <div className={styles.info}>
          <span>{name}</span>
          <span>{car}</span>
        </div>
      </div>
    </div>
  );
}
