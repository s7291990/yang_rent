import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000', // 실제 API 서버 주소로 변경
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function apiFetch() {
  const response = await fetch('/json/address.json');
  if (!response.ok) throw new Error('Failed to fetch address data');
  return response.json();
}

export async function apiFetchCarList() {
  const response = await fetch('/json/carList.json');
  if (!response.ok) throw new Error('Failed to fetch address data');
  return response.json();
}

export async function apiFetchNegligenceList() {
  const response = await fetch('/json/negligenceList.json');
  if (!response.ok) throw new Error('Failed to fetch address data');
  return response.json();
}
