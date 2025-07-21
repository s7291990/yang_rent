// 전체 리스트 가져오기
export async function apiCarFetch() {
  const response = await fetch('/json/carList.json');
  if (!response.ok) throw new Error('Failed to fetch address data');
  return response.json();
}
