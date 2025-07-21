import { create } from 'zustand';
import { Address, CarItem, NegligenceDto } from '../model';

interface AddressStore {
  Address: Address[];
  setAddress: (Address: Address[]) => void;
}

interface CarStore {
  CarList: CarItem[];
  setCarList: (Car: CarItem[]) => void;
}

interface NegligenceStore {
  NegligenceList: NegligenceDto[];
  setNegligenceList: (Negligence: NegligenceDto[]) => void;
}

export const useAddressStore = create<AddressStore>((set) => ({
  Address: [],
  setAddress: (Address) => set({ Address }),
}));

export const useCarStore = create<CarStore>((set) => ({
  CarList: [],
  setCarList: (CarList) => set({ CarList }),
}));

export const useNegligenceStore = create<NegligenceStore>((set) => ({
  NegligenceList: [],
  setNegligenceList: (NegligenceList) => set({ NegligenceList }),
}));
