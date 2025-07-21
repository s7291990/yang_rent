import { apiRentListFetch } from '../api';
import { useRentListStore } from '../store';

// 렌트 리스트 가져오기
export async function fetchRentList() {
  const data = await apiRentListFetch();
  useRentListStore.getState().setRentList(data);
  return data;
}
