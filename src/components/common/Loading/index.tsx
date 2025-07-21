'use client';
import React from 'react';
import styles from './index.module.css';

export default function index() {
  return (
    <div className={styles.modal}>
      <div className={styles.loaderWrapper}>
        <div className={styles.loader}></div>
        <span className={styles.msg}>
          로딩중입니다…
          <br />
          잠시만 기다려주세요…
        </span>
      </div>
    </div>
  );
}
