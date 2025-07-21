'use client';
import React from 'react';
import styles from './page.module.css';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function page() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push('/');
  }

  return (
    <main className={styles.main}>
      <div className={styles.loginContainer}>
        <div className={styles.loginForm}>
          <div className={styles.loginTitle}>회원가입</div>
          <div className={styles.loginDesc}>
            SNS로 간편하게 회원가입이 가능합니다
          </div>
          <div className={styles.loginFormItem}>
            <button type="button" className={styles.btnKakao} onClick={() => signIn('kakao')}>
              <img src="/image/ico/ico-login-kakao.svg" />
              <span>카카오로 계속하기</span>
            </button>
            <button type="button" className={styles.btnNaver} onClick={() => signIn('naver')}>
              <img src="/image/ico/ico-login-naver.svg" />
              <span>네이버 계속하기</span>
            </button>
            <button type="button" className={styles.btnGoogle} onClick={() => signIn('google')}>
              <img src="/image/ico/ico-login-google.svg" />
              <span>Google로 계속하기</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
