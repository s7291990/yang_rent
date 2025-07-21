import { create } from 'zustand';
import { Car, SearchDto } from '../model';

interface CarStore {
  Cars: Car[];
  setCars: (Cars: Car[]) => void;
}

export const useCarsStore = create<CarStore>((set) => ({
  Cars: [],
  setCars: (Cars) => set({ Cars }),
}));

interface SearchFormStore {
  searchForm: SearchDto;
  setSearchForm: (SearchForm: SearchDto) => void;
}

const initialSearchForm: SearchDto = {
  region: '',
  startDate: '',
  endDate: '',
};
export const useSearchFormStore = create<SearchFormStore>((set) => ({
  searchForm: initialSearchForm,
  setSearchForm: (searchForm) => set({ searchForm }),
}));
