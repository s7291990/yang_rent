import axios from 'axios';

// 렌트 리스트 가져오기
export async function apiRentListFetch() {
  const response = await fetch('/json/rent_db.json');
  if (!response.ok) throw new Error('Failed to fetch rent data');
  return response.json();
}
