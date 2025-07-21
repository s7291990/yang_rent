'use client';
import React from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { useNoticeViewStore } from '@/feature/notice/store';

export default function Page() {
  const noticeView = useNoticeViewStore((state) => state.NoticeView);

  const router = useRouter();

  return (
    <main className={styles.main}>
      {/** 서브 헤더 영역
      <div className={styles.subVisual}>
        <div className={styles.title}>공지사항</div>
      </div> */}

      {/** 목록 상세 영역 */}
      <div className={styles.detailWrapper}>
        <div className={styles.detailTitle}>{noticeView?.title}</div>
        <div className={styles.detailDate}>{noticeView?.date}</div>
        <div
          className={styles.detailContent}
          dangerouslySetInnerHTML={{
            __html: noticeView?.description?.replace(/\n/g, '<br />') || '',
          }}
        ></div>
        <button
          type="button"
          className={styles.detailButton}
          onClick={() => {
            router.push('/notice/list');
          }}
        >
          목록
        </button>
      </div>
    </main>
  );
}
