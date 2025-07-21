import axios from 'axios';

// 공지 리스트 가져오기
export async function apiNoticeListFetch() {
  const response = await fetch('/json/notice.json');
  if (!response.ok) throw new Error('Failed to fetch address data');
  return response.json();
}
