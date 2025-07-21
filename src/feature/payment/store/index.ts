import { create } from 'zustand';
import { PaymentDto, RentRdo } from '../model';

const initialPayment: PaymentDto = {
  id: 0,
  region: '', // 선택 지역
  carCompany: '', // 차량 회사명
  carName: '', // 차량명
  carImage: '/image/etc/etc-payment-car-image.png', // 차량명
  carType: 'LPG', // 유종
  defaultPrice: 0, // 기본 대여로
  oneDayPrice: 0, // 1일 요금
  rentDate: 0,
  phone: '', //
  startDate: '',
  startTime: '10:00',
  endDate: '',
  endTime: '16:59',
  delivery: '',
  cdwAge: 0, // CDW 연령기준
  cdwRange: 0, // CDW 구간 기준
  cdwTotal: 0,
  customerName: '', // 본인인증 ( 고객 이름 )
  customerPhone: '', // 본인인증 ( 고객 휴대폰 )
  customerBirthday: '', // 본인인증 ( 고객 생년월일 )
  customerInsuranceAge: '', // 본인인증 ( 고객 보험연령 )
  customerEmail: '', // 본인인증 ( 이메일 )
  cwdAgeRange: '0', // CDW 연령대
  totalPrice: 0, //  전체 금액
};

interface PaymentStore {
  Payment: PaymentDto;
  setPayment: (Payment: Partial<PaymentDto>) => void;
}

export const usePaymentStore = create<PaymentStore>((set) => ({
  Payment: initialPayment,
  setPayment: (QuickReservation) =>
    set((state) => ({
      Payment: { ...state.Payment, ...QuickReservation },
    })),
}));

// 렌트 데이터
interface RentListStore {
  RentList: RentRdo[];
  setRentList: (NoticeList: RentRdo[]) => void;
}

// 렌트 데이터
export const useRentListStore = create<RentListStore>((set) => ({
  RentList: [],
  setRentList: (RentList) => set({ RentList }),
}));
