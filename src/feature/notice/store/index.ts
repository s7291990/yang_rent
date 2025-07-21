import { create } from 'zustand';
import { NoticeRdo } from '../model';

interface NoticeListStore {
  NoticeList: NoticeRdo[];
  setNoticeList: (NoticeList: NoticeRdo[]) => void;
}

// 공지사항 데이터
export const useNoticeListStore = create<NoticeListStore>((set) => ({
  NoticeList: [],
  setNoticeList: (NoticeList) => set({ NoticeList }),
}));

const initialView: NoticeRdo = {
  id: 0,
  title: '',
  date: '',
  description: '',
  name: '',
};

interface NoticeViewStore {
  NoticeView: NoticeRdo;
  setNoticeView: (NoticeView: NoticeRdo) => void;
}

// 공지사항 데이터
export const useNoticeViewStore = create<NoticeViewStore>((set) => ({
  NoticeView: initialView,
  setNoticeView: (NoticeView) => set({ NoticeView }),
}));
