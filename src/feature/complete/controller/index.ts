import { apiFetch, apiCreate, apiUpdate, apiDelete } from '../api';
import { Complete } from '../model';
import { useCompleteStore } from '../store';

// 전체 리스트 가져오기
export async function fetchCompletes() {
  const data = await apiFetch();
  useCompleteStore.getState().setCompletes(data);
  return data;
}

// 등록
export async function createComplete(complete: Omit<Complete, 'id'>) {
  const data = await apiCreate(complete);
  useCompleteStore.getState().addComplete(data);
}

// 삭제
export async function deleteComplete(id: number) {
  await apiDelete(id);
  useCompleteStore.getState().removeComplete(id);
}

// 수정
export async function updateComplete(complete: Complete) {
  const data = await apiUpdate(complete);
  useCompleteStore.getState().updateComplete(data);
}
