'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { FormItem, FormSelect, Loading, ReviewContainer, SearchForm } from '@/components/common';
import { CourTesy } from '@/components/home';
import CountUp from '@/feature/home/helper/CountUp';
import clsx from 'clsx';
import YouTube, { YouTubeProps } from 'react-youtube';
import { fetchNotice } from '@/feature/home/controller';
import { useNoticeStore } from '@/feature/home/store';
import { useSms } from '@/feature/common/sms/helper/useSms';
import { useQuickReservationStore } from '@/feature/quickReservation/store';
import { useRouter } from 'next/navigation';

export default function page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.mute(); // 음소거 적용
    //event.target.pauseVideo();
  };

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      loop: 1,
      playlist: 'aCX8B-ieAwY', // videoId와 동일
    },
  };

  const notices = useNoticeStore((state) => state.Notices);

  useEffect(() => {
    fetchNotice();
    fetchNotice().finally(() => setLoading(false));
    // fetchCompletes().then((result) => {
    //   //setData(result);
    //   console.log(result);
    // });
  }, []);

  // 문자 보내기
  const { phone, setPhone, msg, setMsg, result, setResult, sendSms } = useSms('', '');
  const { QuickReservation, setQuickReservation } = useQuickReservationStore();

  // 버튼 클릭 시 store에 저장 (이미 store에 반영된 값이므로 setContact(Contact) 호출)
  const handleSaveQuickReservation = () => {
    if (!QuickReservation.name) {
      alert('이름을 입력해주세요.');
      return;
    }
    if (!QuickReservation.phone) {
      alert('휴대폰 번호를 입력해주세요.');
      return;
    }
    if (!QuickReservation.region) {
      alert('지역을 선택해주세요.');
      return;
    }
    if (!QuickReservation.carType) {
      alert('차종을 선택해주세요.');
      return;
    }
    // if (!QuickReservation.startDate) {
    //   alert('대여기간을 선택해주세요.');
    //   return;
    // }
    setQuickReservation({ ...QuickReservation }); // 필요시 추가 가공 가능
    //console.log(QuickReservation);
    // 고객
    sendSms(
      QuickReservation.phone,
      `${QuickReservation.name}고객님, 빠른예약이 정상 접수되었습니다.
      \n▶ 예약 내용:
      \nㆍ예약자: ${QuickReservation.name}/${QuickReservation.phone}
      \nㆍ대여기간: ${QuickReservation.startDate}~${QuickReservation.endDate}
      \nㆍ신청차량: ${QuickReservation.carType}
      \nㆍ지역: ${QuickReservation.region}
      \n전문 상담원이 곧 연락드릴 예정입니다. 감사합니다.`,
    );
    // 운영자
    sendSms(
      process.env.NEXT_PUBLIC_ADMIN_PHONE,
      `[단기렌트 빠른예약] 도착했습니다.
      \n▶ 예약 내용:
      \nㆍ예약자: ${QuickReservation.name}/${QuickReservation.phone}
      \nㆍ대여기간: ${QuickReservation.startDate}~${QuickReservation.endDate}
      \nㆍ신청차량: ${QuickReservation.carType}
      \nㆍ지역: ${QuickReservation.region}`,
      false,
    );
  };

  // QNA 상태값
  interface qnaData {
    id: number;
    title: string;
    description: string;
  }
  const [qnaModal, setQnaModal] = useState<boolean>(false);
  const [qnaContent, setQnaContent] = useState<qnaData>({
    id: 0,
    title: '',
    description: '',
  });
  // QNA 데이터
  const qnaData = [
    {
      id: 1,
      title: '장기렌트 시, 추가 운전자를 등록할 수 있나요?',
      description:
        '이튿날, 소년이 학교에서 돌아오니, 아버지가 나들이옷으로 갈아 입고 닭 한 마리를 안고 있었다. 그리고는, 안고 온 꽃묶음 속에서 가지가 꺾이고 꽃이 일그러진 송이를 골라 발 밑에 버린다. 그저 근동에서 제일 가는 이 덕쇠 할아버지네 호두를 어서 소녀에게 맛 보여야 한다는 생각만이 앞섰다. 소년은 소녀네 가 이사해 오기 전에 벌써 어른들의 이야기를 들어서, 윤초시 손자가 서울서 사업에 실패해 가지고 고향에 돌아오지 않을 수 없게 되었다는 걸 알고 있었다. 송진을 생채기에다 문질러 바르고는 그 달음으로 칡덩굴 있는 데로 내려가, 꽃 많이 달린 몇 줄기를 이빨로 끊어 가지고 올라온다. ',
    },
    {
      id: 2,
      title: '대차 차량을 집으로 배달받을 수 있나요?',
      description:
        '이튿날, 소년이 학교에서 돌아오니, 아버지가 나들이옷으로 갈아 입고 닭 한 마리를 안고 있었다. 그리고는, 안고 온 꽃묶음 속에서 가지가 꺾이고 꽃이 일그러진 송이를 골라 발 밑에 버린다. 그저 근동에서 제일 가는 이 덕쇠 할아버지네 호두를 어서 소녀에게 맛 보여야 한다는 생각만이 앞섰다. 소년은 소녀네 가 이사해 오기 전에 벌써 어른들의 이야기를 들어서, 윤초시 손자가 서울서 사업에 실패해 가지고 고향에 돌아오지 않을 수 없게 되었다는 걸 알고 있었다. 송진을 생채기에다 문질러 바르고는 그 달음으로 칡덩굴 있는 데로 내려가, 꽃 많이 달린 몇 줄기를 이빨로 끊어 가지고 올라온다. ',
    },
    {
      id: 3,
      title: '출고가 바로 가능한가요?',
      description:
        '이튿날, 소년이 학교에서 돌아오니, 아버지가 나들이옷으로 갈아 입고 닭 한 마리를 안고 있었다. 그리고는, 안고 온 꽃묶음 속에서 가지가 꺾이고 꽃이 일그러진 송이를 골라 발 밑에 버린다. 그저 근동에서 제일 가는 이 덕쇠 할아버지네 호두를 어서 소녀에게 맛 보여야 한다는 생각만이 앞섰다. 소년은 소녀네 가 이사해 오기 전에 벌써 어른들의 이야기를 들어서, 윤초시 손자가 서울서 사업에 실패해 가지고 고향에 돌아오지 않을 수 없게 되었다는 걸 알고 있었다. 송진을 생채기에다 문질러 바르고는 그 달음으로 칡덩굴 있는 데로 내려가, 꽃 많이 달린 몇 줄기를 이빨로 끊어 가지고 올라온다. ',
    },
    {
      id: 4,
      title: '무심사 장기렌트는 신차, 중고차 모두 가능한가요?',
      description:
        '이튿날, 소년이 학교에서 돌아오니, 아버지가 나들이옷으로 갈아 입고 닭 한 마리를 안고 있었다. 그리고는, 안고 온 꽃묶음 속에서 가지가 꺾이고 꽃이 일그러진 송이를 골라 발 밑에 버린다. 그저 근동에서 제일 가는 이 덕쇠 할아버지네 호두를 어서 소녀에게 맛 보여야 한다는 생각만이 앞섰다. 소년은 소녀네 가 이사해 오기 전에 벌써 어른들의 이야기를 들어서, 윤초시 손자가 서울서 사업에 실패해 가지고 고향에 돌아오지 않을 수 없게 되었다는 걸 알고 있었다. 송진을 생채기에다 문질러 바르고는 그 달음으로 칡덩굴 있는 데로 내려가, 꽃 많이 달린 몇 줄기를 이빨로 끊어 가지고 올라온다. ',
    },
  ];
  const handleQna = (n: number) => {
    setQnaContent(qnaData.find((item) => item.id === n) || { id: n, title: '', description: '' });
    setQnaModal(true);
  };

  // 대여기간 input ref
  const rentalPeriodRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <main>
        {/** 빠른 예약 영역 */}
        <SearchForm dataType="main">
          <FormItem
            className={styles.formItem}
            label="성함"
            placeholder="이름을 입력하세요"
            type="text"
            name="name"
            value={QuickReservation.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuickReservation({ ...QuickReservation, name: e.target.value })
            }
          />

          <FormItem
            className={styles.formItem}
            label="휴대폰 번호"
            placeholder="010-0000-0000"
            type="text"
            name="name"
            maxLength={13}
            value={QuickReservation.phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              let value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 허용
              // 자동 하이픈 처리
              if (value.length < 4) {
                // 010
              } else if (value.length < 8) {
                value = value.replace(/(\d{3})(\d{1,4})/, '$1-$2');
              } else {
                value = value.replace(/(\d{3})(\d{4})(\d{0,4})/, '$1-$2-$3');
              }
              setQuickReservation({ ...QuickReservation, phone: value });
            }}
          />

          <FormSelect
            label="지역"
            className={styles.formItem}
            name="region"
            value={QuickReservation.region}
            variant="region"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuickReservation({ ...QuickReservation, region: e.target.value })
            }
          />

          <FormSelect
            label="차종"
            placeholder="차종을 선택하세요"
            variant="carType"
            className={styles.formItem}
            name="carType"
            value={QuickReservation.carType}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setQuickReservation({ ...QuickReservation, carType: e.target.value });
              setTimeout(() => {
                rentalPeriodRef.current?.focus();
                rentalPeriodRef.current?.click(); // 포커스 후 클릭 이벤트도 발생시켜 달력 자동 오픈
              }, 0);
            }}
          />

          <FormItem
            ref={rentalPeriodRef}
            className={clsx(styles.formItem, styles.flex2)}
            label="대여기간"
            placeholder="대여날짜를 선택하세요"
            type="text"
            dataType="range"
            value={QuickReservation.startDate}
            endValue={QuickReservation.endDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const { startDate, endDate } = e.target.value as unknown as {
                startDate: string;
                endDate: string;
              };
              setQuickReservation({ startDate, endDate });
            }}
            onChangeEnd={(e: React.ChangeEvent<HTMLInputElement>) => {
              const { startDate, endDate } = e.target.value as unknown as {
                startDate: string;
                endDate: string;
              };
              setQuickReservation({ startDate, endDate });
            }}
          />

          {/*<FormItem*/}
          {/*  className={styles.formItem}*/}
          {/*  placeholder="반납날짜를 선택하세요"*/}
          {/*  type="text"*/}
          {/*  dataType="datepicker"*/}
          {/*/>*/}

          <button
            type="button"
            className={styles.btnReservation}
            onClick={handleSaveQuickReservation}
          >
            빠른 예약하기
          </button>
        </SearchForm>

        {/** 전국 최대규모 6만대 이상의 차량 확보 */}
        <div className={styles.homeScale}>
          <div className={styles.rela}>
            <div className={styles.cate}>SCALE</div>
            <div className={styles.scaleInfobox}>
              <div className={styles.title}>
                전국 최대규모
                <br />
                6만대 이상의 차량 확보
              </div>
              <div className={styles.desc}>
                약 2,700여개의 업체에서 전국애 약 61,554대의 차량을 확보하였습니다.
                <br />
                올림포스 네트웍스는 지속적으로 업체 규모를 확대하고 있습니다.
              </div>
            </div>
            <ul>
              <li>
                <div className={styles.value}>
                  <CountUp end={2700} /> +
                </div>
                <div className={styles.label}>제휴 렌트카 업체</div>
              </li>
              <li>
                <div className={styles.value}>
                  <CountUp end={61554} /> +
                </div>
                <div className={styles.label}>전국 보유 차량 수</div>
              </li>
              <li>
                <div className={styles.value}>
                  <CountUp end={2700} /> +
                </div>
                <div className={styles.label}>누적 계약 건수</div>
              </li>
            </ul>
          </div>
        </div>

        {/** 신뢰의 이동, 올림푸스 영역 */}
        <div className={styles.homeTrust}>
          <div className={styles.rela}>
            <div className={styles.image}>
              <img src="/image/etc/etc-trust-image.png" />
            </div>
            <div className={styles.cont}>
              <div className={styles.cate}>TRUST</div>
              <div className={styles.title}>신뢰의 이동, 올림포스</div>
              <div className={styles.desc}>
                올림포스와 함께 안전하고 편리한 차량 대차 서비스를 경험하세요.
                <br />
                다양한 차종과 합리적인 가격으로 고객만족을 실현합니다.
              </div>
              <ul>
                <li>
                  <div className={styles.icon}>
                    <img src="/image/ico/ico-trust-list01.svg" />
                  </div>
                  <div className={styles.rowsItem}>
                    <div className={styles.key}>최고급 라인업</div>
                    <div className={styles.value}>엄선된 차량으로 완성하는 프리미엄 서비스</div>
                  </div>
                </li>
                <li>
                  <div className={styles.icon}>
                    <img src="/image/ico/ico-trust-list02.svg" />
                  </div>
                  <div className={styles.rowsItem}>
                    <div className={styles.key}>완벽한 안전점검</div>
                    <div className={styles.value}>
                      매회 철저한 안전점검과 장비를 통해 믿을 수 있는 관리
                    </div>
                  </div>
                </li>
                <li>
                  <div className={styles.icon}>
                    <img src="/image/ico/ico-trust-list03.svg" />
                  </div>
                  <div className={styles.rowsItem}>
                    <div className={styles.key}>편리하고 정확한 서비스</div>
                    <div className={styles.value}>실시간 확인과 빠른 배차로 기다림 없는 이용</div>
                  </div>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => {
                  router.push('/reservation');
                }}
              >
                렌트 바로 신청하기
              </button>
            </div>
          </div>
        </div>

        {/** 사고대차 문의하기 영역 */}
        <CourTesy />

        {/** 신뢰의 이동, 올림푸스 영역 */}
        <ReviewContainer
          title="올림포스를 선택한 이유"
          desc="이용자들이 직접 전하는 생생한 후기와 만족의 이야기"
          cate="REVIEWS"
        />

        {/** 유튜브 배너 영역 */}
        <div className={styles.homeBanner}>
          {/*<img src="/image/etc/etc-home-banner.jpg" />*/}
          <YouTube
            videoId="aCX8B-ieAwY"
            opts={opts}
            onReady={onPlayerReady}
            className={styles.youtubeFull}
          />
        </div>

        {/** 쉽고 빠른 예약 방법 영역 */}
        <div className={styles.homeMethod}>
          <div className={styles.cate}>RESERVATION</div>
          <div className={styles.title}>쉽고 빠른 예약 방법</div>
          <div className={styles.desc}>단 3단계면 끝! 쉽고 빠르게 예약하고 출발하세요</div>
          <ul>
            <li>
              <div className={styles.step}>1</div>
              <div className={styles.key}>차량 선택</div>
              <div className={styles.value}>
                렌트를 원하는 차종과 차량을 직접 고르고,
                <br />
                나에게 꼭 맞는 이동을 시작해보세요.
              </div>
            </li>
            <li>
              <div className={styles.step}>2</div>
              <div className={styles.key}>일정 선택</div>
              <div className={styles.value}>
                원하는 대여 일정과 픽업 방식을 간편하게 설정하고,
                <br />내 스케줄에 딱 맞춰보세요.
              </div>
            </li>
            <li>
              <div className={styles.step}>3</div>
              <div className={styles.key}>예약 완료</div>
              <div className={styles.value}>
                간편한 결제로 예약을 빠르게 마무리하고,
                <br />
                올림푸스와 함께 여정을 시작해보세요.
              </div>
            </li>
          </ul>
        </div>

        {/** QNA 방법 영역 */}
        <div className={styles.homeQna}>
          <div className={styles.rela}>
            <div className={styles.qnaItem}>
              <div className={styles.title}>
                궁금한 점이 있으신가요?
                <br />
                빠르게 알려드릴게요
              </div>
              <img src="/image/ico/ico-qna-item.png" />
            </div>
            <ul>
              <li>
                <Link
                  href="#"
                  className={clsx({ [styles.on]: qnaContent.id === 1 })}
                  onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                    event.preventDefault();
                    handleQna(1);
                  }}
                >
                  <div className={styles.title}>장기렌트 시, 추가 운전자를 등록할 수 있나요?</div>
                  <img src="/image/ico/ico-plus.svg" />
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className={clsx({ [styles.on]: qnaContent.id === 2 })}
                  onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                    event.preventDefault();
                    handleQna(2);
                  }}
                >
                  <div className={styles.title}>대차 차량을 집으로 배달받을 수 있나요?</div>
                  <img src="/image/ico/ico-plus.svg" />
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className={clsx({ [styles.on]: qnaContent.id === 3 })}
                  onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                    event.preventDefault();
                    handleQna(3);
                  }}
                >
                  <div className={styles.title}>출고가 바로 가능한가요?</div>
                  <img src="/image/ico/ico-plus.svg" />
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className={clsx({ [styles.on]: qnaContent.id === 4 })}
                  onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                    event.preventDefault();
                    handleQna(4);
                  }}
                >
                  <div className={styles.title}>
                    무심사 장기렌트는 신차, 중고차 모두 가능한가요?
                  </div>
                  <img src="/image/ico/ico-plus.svg" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/** 공지사항 영역 */}
        <div className={styles.homeNotice}>
          <div className={styles.cont}>
            <div className={styles.cate}>NOTICE</div>
            <Link href="#" className={styles.noticeLink}>
              <div className={styles.title}>{notices[0]?.title}</div>
              <div className={styles.date}>{notices[0]?.date}</div>
              <div className={styles.desc}>{notices[0]?.description}</div>
            </Link>
          </div>
          <div className={styles.image}>
            <img src={notices[0]?.image} />
          </div>
          <Link href="/notice/list" className={styles.noticeMore}>
            <span>전체보기</span>
            <img src="/image/ico/ico-arrow-right.svg" />
          </Link>
        </div>

        {/** 더 궁금한 사항이 있으신가요? 영역 */}
        <div className={styles.homeHelp}>
          <div className={styles.cate}>더 궁금한 사항이 있으신가요?</div>
          <div className={styles.info}>
            <div className={styles.description}>
              전문 상담원이
              <br />
              친절하게 도와드리겠습니다
            </div>
            <div className={styles.tel}>1533-7120</div>
          </div>
        </div>
      </main>

      {/** QnA 모달팝업 */}
      {qnaModal && (
        <div className={styles.modalPopup}>
          <div className={styles.container}>
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => {
                setQnaModal(false);
                setQnaContent({ ...qnaContent, id: 0 });
              }}
            >
              <img src="/image/ico/ico-close-gray.svg" />
            </button>
            <div className={styles.title}>{qnaContent.title}</div>
            <div className={styles.description}>{qnaContent.description}</div>
          </div>
        </div>
      )}

      {/** 로딩 모달 */}
      {loading && <Loading />}
    </>
  );
}
