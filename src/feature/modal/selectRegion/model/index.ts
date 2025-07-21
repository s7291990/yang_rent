export interface Address {
  sido: string;
  sigungu: string[];
}

export interface CarModelDto {
  name: string;
  types: string[];
  price: string;
}

export interface CarDto {
  manufacturer: string;
  models: CarModelDto[];
}

export interface NegligenceDto {
  negligence: string;
}

export interface CarItem {
  manufacturer: string;
  manufacturerCode: string;
  id: number;
  name: string;
  year: string;
  image: string;
  oilType: string[];
  price: string;
}
