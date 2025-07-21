import React from 'react';
import styles from './index.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLeft}>
          <div className={styles.flogo}>
            <img src="/image/etc/etc-flogo.svg" alt="" />
            <span>신들의 선택, 올림포스렌터카</span>
          </div>
          <ul className={styles.fnbList}>
            <li>
              <Link href="/reservation">단기렌트 서비스</Link>
            </li>
            <li>
              <Link href="/notice/list">공지 사항</Link>
            </li>
            <li>
              <Link href="#">회사소개</Link>
            </li>
            <li>
              <Link href="/contactus">고객센터</Link>
            </li>
            <li>
              <Link href="#">이용약관</Link>
            </li>
            <li>
              <Link href="#">개인정보 처리방침</Link>
            </li>
          </ul>

          <div className={styles.footerRight}>
            <ul>
              <li>
                <Link href="#">
                  <img src="/image/ico/ico-sns-list01.svg" alt="" />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <img src="/image/ico/ico-sns-list02.svg" alt="" />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <img src="/image/ico/ico-sns-list03.svg" alt="" />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <img src="/image/ico/ico-sns-list04.svg" alt="" />
                </Link>
              </li>
            </ul>
            <div className={styles.tel}>1533-7120</div>
            <div className={styles.operatingHours}>
              <span>고객센터 운영시간</span>
              <span>평일 09:00-18:00</span>
            </div>
          </div>

          <ul className={styles.infoList}>
            <li>주식회사 올림포스네트웍스</li>
            <li>경기도 성남시 수정구 고등로 3 현대지식산업센터, A514호</li>
          </ul>
          <ul className={styles.infoList}>
            <li>사업등록번호 656-87-02554</li>
            <li>E-mail : method4th@olymposnetworks.com</li>
          </ul>
          <div className={styles.copyright}>
            Copyright ⓒ 2024 올림포스네트웍스. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
