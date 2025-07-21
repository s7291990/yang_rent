'use client';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './page.module.css';
import { FormItem } from '@/components/common';
import { useRouter } from 'next/navigation';

import { useSms } from '@/feature/common/sms/helper/useSms';
import { usePaymentStore, useRentListStore } from '@/feature/payment/store';
import { RentRdo } from '@/feature/payment/model';
import clsx from 'clsx';
import AddressSearch from '@/components/common/AddressSearch';
import {
  getDateTimeDiff,
  getDayOfWeek,
  requestKcpIdentityVerification,
  requestSmartroPayment,
  toMonthDay,
} from '@/feature/payment/helper';
import { fetchRentList } from '@/feature/payment/controller';

import moment from 'moment';
import 'moment/locale/ko';

export default function page() {
  const router = useRouter();
  const nowTime = moment().format('YYYY.MM.DD');

  // 문자 보내기
  const { phone, setPhone, msg, setMsg, result, setResult, sendSms } = useSms('', '');

  const { Payment, setPayment } = usePaymentStore();

  useEffect(() => {
    console.log('Payment.carName=', Payment.carName);
    if (!Payment.carName) {
      alert('잘못된 접근입니다');
      router.back();
    }
  }, [Payment.carName, router]);

  const daysAndHours = useMemo(
    () => getDateTimeDiff(Payment.startDate, Payment.startTime, Payment.endDate, Payment.endTime),
    [Payment.startDate, Payment.startTime, Payment.endDate, Payment.endTime],
  );

  const isReady = Payment.startDate && Payment.startTime && Payment.endDate && Payment.endTime;

  // 버튼 클릭 시 store에 저장
  const handleSavePayment = () => {
    if (!Payment.startDate) {
      alert('날짜를 선택하세요');
      return;
    }
    if (!Payment.startTime) {
      alert('시간을 선택하세요');
      return;
    }
    if (!Payment.endDate) {
      alert('날짜를 선택하세요');
      return;
    }
    if (!Payment.endTime) {
      alert('시간을 선택하세요');
      return;
    }
    setPayment({ ...Payment }); // 필요시 추가 가공 가능
    //console.log(Payment);
    // 임시 테스트
    let updatedPayment = { ...Payment, customerPhone: '01088335559' };
    updatedPayment = { ...updatedPayment, customerName: '양승진' };
    updatedPayment = { ...updatedPayment, customerEmail: '7291990@daum.net' };
    setPayment(updatedPayment);
    //console.log('updatedPayment=', updatedPayment);
    //handlePayment(updatedPayment);
    requestSmartroPayment();

    // 고객
    // sendSms(
    //     Payment.phone,
    //   `${Payment.name}고객님, 사고대차 문의가 정상 접수되었습니다.
    //   \n▶ 문의 내용:
    //   \nㆍ문의자: ${Payment.name}/${Payment.phone}
    //   \nㆍ사고차량: ${Payment.carNumber}
    //   \nㆍ운전자 나이: 만${Payment.age}세 이상
    //   \n빠른 차량 배정을 위해 담당자가 곧 연락드리겠습니다.`,
    // );
    // // 운영자
    // sendSms(
    //   process.env.NEXT_PUBLIC_ADMIN_PHONE,
    //   `[사고대차예약] 도착했습니다.
    //   \n▶ 문의 내용:
    //   \nㆍ문의자: ${Payment.name}/${Payment.phone}
    //   \nㆍ사고차량: ${Payment.carNumber}
    //   \nㆍ운전자 나이: 만${Payment.age}세 이상`,
    //   false,
    // );

    // 데이터 상태관리
    const rentList = useRentListStore((state) => state.RentList);
    const [rentData, setRentData] = useState<RentRdo[]>(rentList);
    useEffect(() => {
      fetchRentList();
    }, []);
  };

  // 딜리버리
  const deliveryOptions = [
    { value: 'none', title: '딜리버리 없음', desc: '직접 영업소에 픽업/반납', price: 0 },
    { value: 'oneway', title: '편도', desc: '픽업 또는 반납 중 한 번만 딜리버리', price: 10000 },
    { value: 'round', title: '왕복 딜리버리', desc: '픽업과 반납 모두 딜리버리', price: 20000 },
  ];
  const [delivery, setDelivery] = useState('none'); // useState 예시

  const [isPageResult, setIsPageResult] = useState<boolean>(false); // 모바일 결과 페이지 여부

  const handleNext = () => {
    setIsPageResult(true);
  };
  const handleBack = () => {
    setIsPageResult(false);
  };

  return (
    <main className={styles.main}>
      {/** 결제하기 영역 */}
      <div className={clsx(styles.paymentContainer, { [styles.result]: isPageResult })}>
        <div className={clsx(styles.titleMob, styles.paymentFormTitle)}>
          <button
            type="button"
            onClick={() => {
              history.back();
            }}
          >
            <img src="/image/ico/ico-back.svg" />
            <span>결제하기</span>
          </button>
        </div>
        <div className={styles.paymentForm}>
          <div className={styles.title}>결제하기</div>

          <div className={styles.carContainer}>
            <div className={styles.carImage}>
              <img src={Payment.carImage} />
            </div>
            <div className={styles.carCont}>
              <div className={styles.carInfo}>
                <div className={styles.carName}>
                  {Payment.carCompany} {Payment.carName}
                </div>
                <div className={styles.carType}>{Payment.carType}</div>
              </div>
              <ul>
                <li>
                  <div className={styles.key}>기본 대여료 (1~2일)</div>
                  <div className={styles.value}>{Payment.defaultPrice.toLocaleString()}원</div>
                </li>
                <li>
                  <div className={styles.key}>1일 요금</div>
                  <div className={styles.value}>{Payment.oneDayPrice.toLocaleString()}원</div>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <div className={styles.subject}>예약 일정 및 시간</div>
            </div>
            <div className={styles.formBody}>
              <FormItem
                className={styles.formItem}
                label="대여 시작일"
                placeholder="대여 시작일을 선택하세요"
                type="text"
                dataType="datepicker"
                name="startDate"
                value={Payment.startDate}
                onChange={(e) => setPayment({ startDate: e.target.value })}
              />
              <FormItem
                className={styles.formItem}
                label="대여 시작시간"
                placeholder="시간을 선택하세요"
                type="text"
                dataType="timepicker"
                name="startTime"
                value={Payment.startTime}
                onChange={(e) => setPayment({ startTime: e.target.value })}
              />
              <FormItem
                className={styles.formItem}
                label="반납 예정일"
                placeholder="날짜를 선택하세요"
                type="text"
                dataType="datepicker"
                name="endDate"
                value={Payment.endDate}
                onChange={(e) => setPayment({ endDate: e.target.value })}
              />
              <FormItem
                className={styles.formItem}
                label="반납 예정시간"
                placeholder="시간을 선택하세요"
                type="text"
                dataType="timepicker"
                name="endTime"
                value={Payment.endTime}
                onChange={(e) => setPayment({ endTime: e.target.value })}
              />
            </div>
          </div>

          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <div className={styles.subject}>딜리버리 서비스</div>
            </div>
            <div className={styles.formBody}>
              <div className={styles.deliveryGroup}>
                {deliveryOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={clsx(styles.btnDelivery, { [styles.on]: delivery === opt.value })}
                    onClick={() => {
                      setDelivery(opt.value);
                      setPayment({ ...Payment, delivery: opt.price.toString() });
                      if (delivery !== 'none') {
                        setPayment({ region: '' });
                      }
                    }}
                  >
                    <div className={styles.title}>{opt.title}</div>
                    <div className={styles.desc}>{opt.desc}</div>
                  </button>
                ))}
              </div>
              {delivery !== 'none' && (
                <AddressSearch onChange={(addr) => setPayment({ region: addr })} />
              )}
            </div>
          </div>

          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <div className={styles.subject}>운전자 정보</div>
              <div className={styles.desc}>본인 인증 시 정보가 자동 기입됩니다</div>
            </div>
            <button
              type="button"
              className={styles.btnCertification}
              onClick={requestKcpIdentityVerification}
            >
              본인인증
            </button>
            <div className={styles.formBody}>
              <FormItem
                className={styles.formItem}
                label="성함"
                placeholder=""
                type="text"
                value={Payment.customerName}
                readonly={true}
              />
              <FormItem
                className={styles.formItem}
                label="연락처"
                placeholder=""
                type="text"
                value={Payment.customerPhone}
                readonly={true}
              />
              <FormItem
                className={styles.formItem}
                label="생년원일"
                placeholder=""
                type="text"
                value={Payment.customerBirthday}
                readonly={true}
              />
              <FormItem
                className={styles.formItem}
                label="보험연령"
                placeholder=""
                type="text"
                value={Payment.customerInsuranceAge}
                readonly={true}
              />
            </div>
          </div>

          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <div className={styles.subject}>쿠폰</div>
            </div>

            <div className={styles.formBody}>
              <div className={styles.couponContainer}>
                <FormItem
                  className={styles.formItem}
                  label="쿠폰번호"
                  placeholder=""
                  type="text"
                  value={Payment.customerName}
                  readonly={true}
                />
                <button type="button" className={styles.couponButton}>
                  적용하기
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className={clsx(styles.btnPayment, styles.nextButton)}
          onClick={handleNext}
        >
          다음
        </button>

        {/** 정보 예상 금액 영역 */}
        <div className={clsx(styles.titleMob, styles.reulstTitle)}>
          <button type="button" onClick={handleBack}>
            <img src="/image/ico/ico-back.svg" />
            <span>결제하기</span>
          </button>
        </div>
        <div className={styles.paymentReulst}>
          <div className={styles.reulstContainer}>
            <div className={styles.title}>예상 금액</div>
            <ul>
              <li>
                <div className={styles.key}>선택 지역</div>
                <div className={styles.value}>{Payment.region}</div>
              </li>
            </ul>

            <ul>
              <li>
                <div className={styles.key}>예약 일자</div>
                <div className={styles.value}>{nowTime}</div>
              </li>
              <li>
                <div className={styles.key}>이용 기간</div>
                <div className={styles.value}>
                  {!Payment.startDate &&
                  !Payment.startTime &&
                  !Payment.endDate &&
                  !Payment.endTime ? (
                    <>로딩 중...</>
                  ) : isReady ? (
                    <>
                      {toMonthDay(Payment.startDate)} ({getDayOfWeek(Payment.startDate)}){' '}
                      {Payment.startTime} ~{toMonthDay(Payment.endDate)} (
                      {getDayOfWeek(Payment.endDate)}) <br />
                      {Payment.endTime} ({daysAndHours.days}일 {daysAndHours.hours}시간)
                    </>
                  ) : (
                    <>날짜/시간을 선택해 주세요</>
                  )}
                </div>
              </li>
              <li>
                <div className={styles.key}>CDW 연령대</div>
                <div className={styles.value}>만 {Payment.cwdAgeRange}세 이상</div>
              </li>
              <li>
                <div className={styles.key}>차종(유종)</div>
                <div className={styles.value}>{Payment.carType}</div>
              </li>
              <li>
                <div className={styles.key}>딜리버리</div>
                <div className={styles.value}>
                  {
                    deliveryOptions.find(
                      (opt) => opt.price === Number(Payment.delivery.toLocaleString()),
                    )?.title
                  }
                </div>
              </li>
            </ul>

            <ul>
              <li>
                <div className={styles.key}>딜리버리 요금</div>
                <div className={styles.value}>{Payment.delivery.toLocaleString() || 0}원</div>
              </li>
              <li>
                <div className={styles.key}>CDW 연령기준</div>
                <div className={styles.value}>{Payment.cdwAge.toLocaleString() || 0}원</div>
              </li>
              <li>
                <div className={styles.key}>CDW 구간기준</div>
                <div className={styles.value}>{Payment.cdwRange.toLocaleString() || 0}원</div>
              </li>
            </ul>

            <ul>
              <li>
                <div className={styles.key}>CDW 합산 (보험료)</div>
                <div className={styles.value}>{Payment.cdwTotal.toLocaleString()}원</div>
              </li>
              <li>
                <div className={styles.key}>렌트비용 원단가</div>
                <div className={styles.value}>{Payment.oneDayPrice.toLocaleString()}원</div>
              </li>
            </ul>

            <ul>
              <li>
                <div className={styles.key}>올림포스 채널 추가 50% 할인</div>
                <div className={styles.value}>-{Payment.delivery.toLocaleString() || 0}원</div>
              </li>
              <li>
                <div className={styles.key}>지니TV 쿠폰 등록 10% 할인</div>
                <div className={styles.value}>-{Payment.cdwAge.toLocaleString() || 0}원</div>
              </li>
            </ul>

            <div className={styles.totalInfo}>
              <div className={styles.key}>총 결제 금액</div>
              <div className={styles.value}>{Payment.totalPrice.toLocaleString()}원</div>
            </div>
          </div>

          <button type="button" className={styles.btnPayment} onClick={handleSavePayment}>
            {Payment.totalPrice.toLocaleString()}원 결제하기
          </button>
        </div>
      </div>
    </main>
  );
}
