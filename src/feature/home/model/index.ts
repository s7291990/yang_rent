export interface Complete {
  id: number;
  carType: string;
  name: string;
  phone: string;
  age: string;
  date: string;
  time: string;
  delivery: string;
  rent: string;
  cdw: string;
  total: string;
}

// 공지사항 데이터 타입
export interface Notices {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
}

// 리뷰 데이터 타입
export interface Reviews {
  id: number;
  title: string;
  description: string;
  image: string;
  name: string;
  car: string;
}
