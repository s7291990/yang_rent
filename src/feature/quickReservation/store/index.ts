import { create } from 'zustand';
import { QuickReservationDto } from '../model';

const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate()).padStart(2, '0');
const todayStr = `${yyyy}-${mm}-${dd}`;

const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const yyyy2 = tomorrow.getFullYear();
const mm2 = String(tomorrow.getMonth() + 1).padStart(2, '0');
const dd2 = String(tomorrow.getDate()).padStart(2, '0');
const tomorrowStr = `${yyyy2}-${mm2}-${dd2}`;

const initialQuickReservation: QuickReservationDto = {
  name: '',
  phone: '',
  region: '',
  carType: '',
  startDate: todayStr,
  endDate: tomorrowStr,
};

interface QuickReservationStore {
  QuickReservation: QuickReservationDto;
  setQuickReservation: (QuickReservation: Partial<QuickReservationDto>) => void;
}

export const useQuickReservationStore = create<QuickReservationStore>((set) => ({
  QuickReservation: initialQuickReservation,
  setQuickReservation: (QuickReservation) =>
    set((state) => ({
      QuickReservation: { ...state.QuickReservation, ...QuickReservation },
    })),
}));
