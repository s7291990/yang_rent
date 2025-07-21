import { apiFetch, apiFetchCarList, apiFetchNegligenceList } from '../api';
import { useAddressStore, useCarStore, useNegligenceStore } from '../store';

// 전체 리스트 가져오기
export async function fetchAddress() {
  const data = await apiFetch();
  useAddressStore.getState().setAddress(data);
  return data;
}

// 전체 리스트 가져오기
export async function fetchCarList() {
  const data = await apiFetchCarList();
  useCarStore.getState().setCarList(data);
  return data;
}

// 전체 리스트 가져오기
export async function fetchNegligenceList() {
  const data = await apiFetchNegligenceList();
  useNegligenceStore.getState().setNegligenceList(data);
  return data;
}
