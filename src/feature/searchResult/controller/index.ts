import { apiCarFetch } from '../api';
import { useCarsStore } from '../store';

// 전체 리스트 가져오기
export async function fetchCar() {
  const data = await apiCarFetch();
  useCarsStore.getState().setCars(data);
  return data;
}
