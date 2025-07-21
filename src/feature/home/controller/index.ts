import { apiNoticeFetch, apiReviewFetch } from '../api';
import { useNoticeStore, useReviewStore } from '../store';

// 공지사항 리스트 가져오기
export async function fetchNotice() {
  const data = await apiNoticeFetch();
  useNoticeStore.getState().setNotices(data);
  return data;
}

// 리뷰 리스트 가져오기
export async function fetchReview() {
  const data = await apiReviewFetch();
  useReviewStore.getState().setReviews(data);
  return data;
}
