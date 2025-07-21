export interface Car {
  id: number;
  manufacturer: string;
  manufacturerCode: string;
  name: string;
  year: string;
  image: string;
  oilType: string[];
  price: string;
}

// 검색 조건 저장
export interface SearchDto {
  region: string;
  startDate: string;
  endDate: string;
}
