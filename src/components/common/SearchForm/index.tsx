import React, { useState } from 'react';
import styles from './index.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

export type DataType = 'main' | 'sub';

interface InputProps {
  subTitle?: string;
  dataType?: DataType;
  children?: React.ReactNode;
}

export default function index({ subTitle = '', dataType, children }: InputProps) {
  const router = useRouter();
  // EVENT 모달 팝업 상태
  const [eventModal, setEventModal] = useState<boolean>(false);
  return (
    <>
      <div className={styles.homeReservation}>
        {dataType === 'main' && (
          <div className={styles.visualSwiper}>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
              <SwiperSlide>
                <div className={styles.visualItem}>
                  <div className={styles.desc}>
                    올림포스와 함께 안전하고 편리한 차량 대차 서비스를 경험하세요.
                  </div>
                  <div className={styles.title}>신들의 선택, 최고의 여정</div>
                  <div className={styles.image}>
                    <img src="/image/etc/etc-home-slide-img01.png" className={styles.imagePc} />
                    <img
                      src="/image/etc/etc-home-slide-img01-mob.png"
                      className={styles.imageMob}
                    />
                  </div>
                  <button
                    type="button"
                    className={styles.button}
                    onClick={() => {
                      router.push('/reservation');
                    }}
                  >
                    렌트 바로 신청하기
                  </button>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={styles.visualItem}>
                  <div className={styles.etc}>
                    단기렌트 서비스 오픈기념 이벤트
                    <br />
                    <strong>올림포스 채널 추가하면 렌터카 50% 할인!</strong>
                  </div>
                  <div className={styles.desc}>KT 지니TV 고객에게 추가 10% 할인 이벤트 진행 중</div>
                  <div className={styles.image}>
                    <img src="/image/etc/etc-home-slide-img02.png" className={styles.imagePc} />
                    <img
                      src="/image/etc/etc-home-slide-img02-mob.png"
                      className={styles.imageMob}
                    />
                  </div>
                  <button
                    type="button"
                    className={styles.button}
                    onClick={() => setEventModal(true)}
                  >
                    자세히 보기
                  </button>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        )}
        {dataType === 'sub' && (
          <div className={styles.subVisual}>
            <div className={styles.title}>{subTitle}</div>
          </div>
        )}

        <div className={clsx(styles.reservationForm, { [styles.subType]: dataType === 'sub' })}>
          {dataType === 'main' && (
            <div className={styles.formHeader}>
              <div className={styles.title}>빠른 예약</div>
              <div className={styles.desc}>
                빠른 예약으로 단 1시간 이내 접수 완료!
                <br />
                전문 상담원이 신속하게 대체 차량을 연결해 드립니다.
              </div>
            </div>
          )}

          <div className={styles.formBody}>{children}</div>
        </div>
      </div>

      {/** 카톡친구 50% 이벤트 모달팝업 */}
      {eventModal && (
        <div className={styles.modalPopup}>
          <div className={styles.container}>
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => {
                setEventModal(false);
              }}
            >
              <img src="/image/ico/ico-close-gray.svg" />
            </button>
            <div className={styles.image}>
              <img src="/image/etc/etc-home-event.png" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
