'use client';
import React, { useEffect } from 'react';
import styles from './page.module.css';
import { fetchCompletes } from '@/feature/complete/controller';
import { useCompleteStore } from '@/feature/complete/store';
import { useRouter } from 'next/navigation';

export default function page() {
  const router = useRouter();
  const completes = useCompleteStore((state) => state.completes);

  useEffect(() => {
    fetchCompletes();
    // fetchCompletes().then((result) => {
    //   //setData(result);
    //   console.log(result);
    // });
  }, []);

  return (
    <main className={styles.main}>
      {/** 결제가 완료되었습니다 영역 */}
      <div className={styles.completeContainer}>
        <div className={styles.completeHeader}>
          <div className={styles.completeTitle}>결제가 완료되었습니다</div>
          <div className={styles.completeDesc}>
            1시간 이내에 담당자가 작성해주신 연락처로 연락드릴 예정입니다.
            <br />
            (09:00~18:00 기준 / 주말 및 공휴일 제외)
          </div>
        </div>

        <div className={styles.subject}>예약 내용</div>

        <div className={styles.carInfo}>
          <div className={styles.key}>차종</div>
          <div className={styles.value}>{completes[0]?.carType}</div>
        </div>

        <dl>
          <dt>예약자 정보</dt>
          <dd>
            <ul>
              <li>
                <div className={styles.key}>성함</div>
                <div className={styles.value}>{completes[0]?.name}</div>
              </li>
              <li>
                <div className={styles.key}>연락처</div>
                <div className={styles.value}>{completes[0]?.phone}</div>
              </li>
              <li>
                <div className={styles.key}>운전자 연령</div>
                <div className={styles.value}>{completes[0]?.age}</div>
              </li>
            </ul>
          </dd>
          <dt>예약 정보</dt>
          <dd>
            <ul>
              <li>
                <div className={styles.key}>이용 기간</div>
                <div className={styles.value}>
                  {completes[0]?.date}
                  <br />
                  {completes[0]?.time}
                </div>
              </li>
              <li>
                <div className={styles.key}>딜리버리</div>
                <div className={styles.value}>{completes[0]?.delivery}</div>
              </li>
            </ul>
          </dd>
          <dt>금액 정보</dt>
          <dd>
            <ul>
              <li>
                <div className={styles.key}>렌트비용 원단가</div>
                <div className={styles.value}>{completes[0]?.rent}</div>
              </li>
              <li>
                <div className={styles.key}>CDW 합산 (보험료)</div>
                <div className={styles.value}>{completes[0]?.cdw}</div>
              </li>
            </ul>
          </dd>
        </dl>

        <div className={styles.totalInfo}>
          <div className={styles.key}>총 결제 금액</div>
          <div className={styles.value}>{completes[0]?.total}</div>
        </div>
      </div>

      <button
        type="button"
        className={styles.btnHome}
        onClick={() => {
          router.push('/');
        }}
      >
        홈으로
      </button>
    </main>
  );
}
