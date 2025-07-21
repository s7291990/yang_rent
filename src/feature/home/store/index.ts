import { create } from 'zustand';
import { Notices, Reviews } from '../model';

interface NoticeStore {
  Notices: Notices[];
  setNotices: (Notices: Notices[]) => void;
}

// 공지사항 데이터
export const useNoticeStore = create<NoticeStore>((set) => ({
  Notices: [],
  setNotices: (Notices) => set({ Notices }),
}));

interface ReviewStore {
  Reviews: Reviews[];
  setReviews: (ReviewsStore: Reviews[]) => void;
}

// 리뷰 데이터
export const useReviewStore = create<ReviewStore>((set) => ({
  Reviews: [],
  setReviews: (Reviews) => set({ Reviews }),
}));
