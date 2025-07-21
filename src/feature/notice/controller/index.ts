import { apiNoticeListFetch } from '../api';
import { useNoticeListStore } from '../store';

// 공지사항 리스트 가져오기
export async function fetchNoticeList() {
  const data = await apiNoticeListFetch();
  useNoticeListStore.getState().setNoticeList(data);
  return data;
}
