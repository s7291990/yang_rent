export interface PaymentDto {
  id: number;
  region: string; // 선택 지역
  carImage: string; // 차량 이미지
  carCompany: string; // 차량 회사명
  carName: string; // 차량명
  carType: string; // 유종
  defaultPrice: number; // 기본 대여로
  oneDayPrice: number; // 1일 요금
  rentDate: number;
  phone: string; //
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  delivery: string;
  cdwAge: number; // CDW 연령기준 금액
  cdwRange: number; // CDW 구간 기준 금액
  cdwTotal: number; // CDW 합산 (보험료)
  customerName: string; // 본인인증 ( 고객 이름 )
  customerPhone: string; // 본인인증 ( 고객 휴대폰 )
  customerBirthday: string; // 본인인증 ( 고객 생년월일 )
  customerInsuranceAge: string; // 본인인증 ( 고객 보험연령 )
  customerEmail: string; // 본인인증 ( 이메일 )
  cwdAgeRange: string; // CDW 연령대
  totalPrice: number; //  전체 금액
}

// 렌트 데이터
export interface RentRdo {
  car_type: string;
  oil_type: string;
  year: number;
  rent_day: number;
  age_range: string;
  car_1d_price: string;
  car_price_total: string;
  age_price: string;
  cdw_1d: string;
  cdw_total: string;
  sum_total: string;
}
