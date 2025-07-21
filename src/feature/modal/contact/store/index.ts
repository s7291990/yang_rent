import { create } from 'zustand';
import { ContactDto } from '../model';

const initialContact: ContactDto = {
  name: '',
  phone: '',
  carNumber: '',
  strokes: '',
  region: '',
  receiptNumber: '',
  insuranceCompany: '',
  negligence: '',
  age: '',
};

interface ContactStore {
  Contact: ContactDto;
  setContact: (Contact: ContactDto) => void;
}

export const useContactStore = create<ContactStore>((set) => ({
  Contact: initialContact,
  setContact: (Contact) => set({ Contact }),
}));
