'use client';
import * as PortOne from '@portone/browser-sdk/v2';
import { usePaymentStore, useRentListStore } from '@/feature/payment/store';
import { fetchRentList } from '@/feature/payment/controller';

declare global {
  interface Window {
    //PortOne: any;
    IMP: any;
  }
}

export function getDayOfWeek(dateStr: string) {
  if (!dateStr) return '';
  // 다양한 포맷 지원: '2025-07-23', '2025. 07. 23', '2025/07/23'
  let normalized = dateStr.replace(/\./g, '/').replace(/-/g, '/').replace(/\s/g, '');
  const date = new Date(normalized);
  if (isNaN(date.getTime())) return '';
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return days[date.getDay()];
}

export function getDateTimeDiff(
  startDate: string,
  startTime: string,
  endDate: string,
  endTime: string,
): { days: number; hours: number } {
  if (!startDate || !startTime || !endDate || !endTime) {
    console.log('입력값 부족:', { startDate, startTime, endDate, endTime });
    return { days: 0, hours: 0 };
  }

  // 포맷을 모두 하이픈(-)으로 변환
  const normalizeDate = (dateStr: string) =>
    dateStr.includes('-') ? dateStr : dateStr.replace(/\./g, '-').replace(/\s/g, '');

  const start = new Date(`${normalizeDate(startDate)}T${startTime}:00`);
  const end = new Date(`${normalizeDate(endDate)}T${endTime}:00`);
  console.log('start:', start, 'end:', end);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    console.log('Invalid Date:', start, end, startDate, endDate, startTime, endTime);
    return { days: 0, hours: 0 };
  }

  const diffMs = end.getTime() - start.getTime();
  if (diffMs < 0) return { days: 0, hours: 0 };

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  return { days, hours };
}

export function toMonthDay(dateStr: string) {
  if (!dateStr) return '';
  // 다양한 포맷 지원: '2025-07-23', '2025. 07. 23', '2025/07/23'
  let parts;
  if (dateStr.includes('-')) {
    parts = dateStr.split('-');
  } else if (dateStr.includes('.')) {
    parts = dateStr.replace(/\s/g, '').split('.');
  } else if (dateStr.includes('/')) {
    parts = dateStr.split('/');
  } else {
    return '';
  }
  if (parts.length !== 3) return '';
  return `${parts[1]}.${parts[2]}`;
}

async function doFetchAndLog() {
  // 본인인증 세팅 값 임의로 주입
  const setPayment = usePaymentStore.getState().setPayment;
  const latestPayment = usePaymentStore.getState().Payment;
  setPayment({
    ...latestPayment,
    customerBirthday: '1980.04.12',
    customerEmail: '7291990@daum.net',
    customerInsuranceAge: '45',
    customerName: '양승진',
    customerPhone: '01088335559',
  });

  const updatedPayment = usePaymentStore.getState().Payment;
  console.log(updatedPayment);
  console.log('본인인증 요청 및 Payment.delivery 세팅');

  // 본인 인증 데이터 조회
  await fetchRentList(); // 데이터 fetch 및 store에 세팅
  const rentList = useRentListStore.getState().RentList; // 최신값 읽기
  console.log(rentList); // 데이터가 잘 나와야 정상!

  const insuranceAge = Number(updatedPayment.customerInsuranceAge);
  const insuranceAgeRange =
    insuranceAge >= 21 && insuranceAge <= 23
      ? '21-23'
      : insuranceAge >= 24 && insuranceAge <= 25
        ? '24-25'
        : insuranceAge >= 26 && insuranceAge <= 29
          ? '26-29'
          : insuranceAge >= 30
            ? '30'
            : '';
  const rentDay = Number(updatedPayment.rentDate);
  const carName = updatedPayment.carName;
  let searchData = rentList.find(
    (item) =>
      item.age_range === insuranceAgeRange && // 나이 검색
      item.rent_day === rentDay && // 렌트 기간
      item.car_type === carName, // 차량명
  );
  console.log(insuranceAgeRange, rentDay, carName);
  console.log(searchData);

  if (searchData) {
    const latestPayment = usePaymentStore.getState().Payment;
    setPayment({
      ...latestPayment,
      totalPrice: Number(searchData?.sum_total) ?? 0,
      oneDayPrice: Number(searchData?.car_1d_price) ?? 0,
      defaultPrice: Number(searchData?.car_1d_price) ?? 0,
      cdwAge: Number(searchData?.age_price) ?? 0,
      cdwRange: Number(searchData?.cdw_1d) ?? 0,
      cwdAgeRange: insuranceAgeRange,
      cdwTotal: Number(searchData?.cdw_total) ?? 0,
    });

    const updatedPayment = usePaymentStore.getState().Payment;
    console.log(updatedPayment);
    console.log('본인인증 요청 및 Payment.delivery 세팅');
  }
}

// NHN KCP V2 본인인증 연동
export function requestKcpIdentityVerification() {
  // PortOne.requestIdentityVerification({
  //   storeId: process.env.NEXT_PUBLIC_KCP_STOREID || '',
  //   channelKey: process.env.NEXT_PUBLIC_KCP_CHANNELKEY || '',
  //   identityVerificationId: `idv${Date.now()}`,
  //   user: {
  //     name: "양승진",
  //     phoneNumber: "01088335559"
  //   },
  //   minAge: 19, // 인증 최소 나이(선택)
  //   onSuccess: (res: any) => {
  //     console.log('인증 성공', res);
  //     alert('인증 성공: ' + JSON.stringify(res));
  //   },
  //   onError: (err: any) => {
  //     console.log('인증 실패', err);
  //     alert('인증 실패: ' + JSON.stringify(err));
  //   },
  // });
  doFetchAndLog();
}

// 스마트로 결제
export function requestSmartroPayment() {
  PortOne.requestPayment({
    storeId: process.env.NEXT_PUBLIC_SMARTRO_STOREID || '', // 포트원 콘솔에서 확인
    channelKey: process.env.NEXT_PUBLIC_SMARTRO_CHANNELKEY || '', // 포트원 콘솔에서 확인
    paymentId: `payment${Date.now()}`, // 주문 고유번호(영문/숫자, 40자 이내, 중복불가)
    orderName: '테스트 상품',
    totalAmount: 1000, // 결제금액
    currency: 'CURRENCY_KRW',
    payMethod: 'CARD', // 카드결제
    customer: {
      phoneNumber: '01012345678', // 구매자 연락처(필수)
    },
    // @ts-ignore
    onSuccess: (res: any) => {
      alert('결제 성공: ' + JSON.stringify(res));
      // 결제 성공 후 처리
    },
    onError: (err: any) => {
      alert('결제 실패: ' + JSON.stringify(err));
      // 결제 실패 후 처리
    },
  });
}
