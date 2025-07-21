import { create } from 'zustand';
import { Complete } from '../model';

interface CompleteStore {
  completes: Complete[];
  setCompletes: (completes: Complete[]) => void;
  addComplete: (complete: Complete) => void;
  removeComplete: (id: number) => void;
  updateComplete: (complete: Complete) => void;
}

export const useCompleteStore = create<CompleteStore>((set) => ({
  completes: [],
  setCompletes: (completes) => set({ completes }),
  addComplete: (complete) =>
    set((state) => ({ completes: [...state.completes, complete] })),
  removeComplete: (id) =>
    set((state) => ({ completes: state.completes.filter((c) => c.id !== id) })),
  updateComplete: (complete) =>
    set((state) => ({
      completes: state.completes.map((c) =>
        c.id === complete.id ? complete : c,
      ),
    })),
}));
