import React, { useState } from 'react';
import styles from './index.module.css';
import 'swiper/css';
import 'swiper/css/navigation';
import Contact from '@/components/common/Contact';

export default function CourTesy() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleContactOpen = () => {
    setIsOpen(true);
  };
  const handleContactClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className={styles.homeCourtesyCar}>
        <div className={styles.cate}>COURTESY CAR</div>
        <div className={styles.cont}>
          <div className={styles.title}>사고에도 문제없는 이동</div>
          <div className={styles.desc}>
            예기치 못한 사고에도 안심
            <br />
            필요할 때 신속하게 대체 차량을 연결해 드립니다.
          </div>
          <button type="button" onClick={handleContactOpen}>
            사고대차 문의하기
          </button>
        </div>
      </div>
      {/** 사고대차 문의 팝업 */}
      <Contact isContactOpen={isOpen} onClose={handleContactClose} />
    </>
  );
}
