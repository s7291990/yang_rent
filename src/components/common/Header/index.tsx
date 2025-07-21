'use client';
import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import Link from 'next/link';
import clsx from 'clsx';
import Contact from '@/components/common/Contact';
import { usePathname, useRouter } from 'next/navigation';

import { signOut, useSession } from 'next-auth/react';

export default function Header() {
  const [totalMenu, setTotalMenu] = useState<boolean>(false);
  const handleTotalMenuOpen = () => {
    setTotalMenu(true);
  };
  const handleTotalMenuClose = () => {
    setTotalMenu(false);
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleContactOpen = () => {
    setIsOpen(true);
  };
  const handleContactClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(isOpen);
  }, [isOpen]);

  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navContainer}>
          <Link href="/" className={styles.logo}>
            <img src="/image/etc/etc-logo.svg" alt="" />
          </Link>

          <ul className={styles.navMenu}>
            <li className={styles.navItem} data-menu="company">
              <Link
                href="/reservation"
                className={clsx(styles.navLink, { [styles.active]: pathname === '/reservation' })}
              >
                단기렌트 서비스
              </Link>
            </li>
            <li className={styles.navItem} data-menu="games">
              <Link href="#" className={styles.navLink}>
                회사소개
              </Link>
            </li>
            <li className={styles.navItem} data-menu="careers">
              <Link
                href="/service"
                className={clsx(styles.navLink, { [styles.active]: pathname === '/service' })}
              >
                서비스 안내
              </Link>
            </li>
            <li className={styles.navItem} data-menu="news">
              <Link
                href="/contactus"
                className={clsx(styles.navLink, { [styles.active]: pathname === '/contactus' })}
              >
                고객센터
              </Link>
            </li>
            <li className={styles.navItem} data-menu="news">
              <Link
                href="/notice/list"
                className={clsx(styles.navLink, { [styles.active]: pathname === '/notice/list' })}
              >
                공지사항
              </Link>
            </li>
          </ul>

          <div className={styles.rightSection}>
            <button type="button" className={styles.btnContact} onClick={handleContactOpen}>
              사고차 문의
            </button>
            {session ? (
              <button type="button" className={styles.btnLogin} onClick={() => signOut()}>
                로그아웃
              </button>
            ) : (
              <button
                type="button"
                className={styles.btnLogin}
                onClick={() => router.push('/login')}
              >
                로그인
              </button>
            )}
            <button type="button" className={styles.hamburger} onClick={handleTotalMenuOpen}>
              <img src="/image/ico/ico-totalmenu.svg" alt="" />
            </button>
          </div>
        </nav>
      </header>
      {/** 모바일 메뉴 */}
      <div className={clsx(styles.totalMenuContainer, { [styles.active]: totalMenu })}>
        <div className={styles.totalMenuItem}>
          <button type="button" className={styles.totalMenuClose} onClick={handleTotalMenuClose}>
            <img src="/image/ico/ico-close-white.svg" alt="" />
          </button>
          <ul className={styles.mobMenu}>
            <li className={styles.navItem} data-menu="company">
              <Link href="/reservation" className={styles.navLink}>
                단기렌트 서비스
              </Link>
            </li>
            <li className={styles.navItem} data-menu="games">
              <Link href="#" className={styles.navLink}>
                회사소개
              </Link>
            </li>
            <li className={styles.navItem} data-menu="careers">
              <Link href="/service" className={styles.navLink}>
                서비스 안내
              </Link>
            </li>
            <li className={styles.navItem} data-menu="news">
              <Link href="/contactus" className={styles.navLink}>
                고객센터
              </Link>
            </li>
            <li className={styles.navItem} data-menu="news">
              <Link href="/notice/list" className={styles.navLink}>
                공지사항
              </Link>
            </li>
          </ul>
          <div className={styles.mobButton}>
            <button type="button" className={styles.btnContact} onClick={handleContactOpen}>
              사고차 문의
            </button>
            {session ? (
              <button type="button" className={styles.btnLogin} onClick={() => signOut()}>
                로그아웃
              </button>
            ) : (
              <button
                type="button"
                className={styles.btnLogin}
                onClick={() => router.push('/login')}
              >
                로그인
              </button>
            )}
          </div>
        </div>
      </div>

      {/** 사고대차 문의 팝업 */}
      <Contact isContactOpen={isOpen} onClose={handleContactClose} />
    </>
  );
}
