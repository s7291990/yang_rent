import axios from 'axios';
import { Complete } from '../model';

const instance = axios.create({
  baseURL: 'http://localhost:4000', // 실제 API 서버 주소로 변경
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 전체 리스트 가져오기
export async function apiFetch() {
  const response = await instance.get<Complete[]>('/complete');
  return response.data;
}

// 등록
export async function apiCreate(data: Omit<Complete, 'id'>) {
  const response = await instance.post<Complete>('/complete', data);
  return response.data;
}

// 수정
export async function apiUpdate(data: Complete) {
  const response = await instance.put<Complete>(`/complete/${data.id}`, data);
  return response.data;
}

// 삭제
export async function apiDelete(id: number) {
  await instance.delete(`/complete/${id}`);
}
