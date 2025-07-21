import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { phone, msg } = await req.json();

  // 환경변수에서 값 불러오기
  const api_key = process.env.MESSAGE_API_KEY!;
  const callback = process.env.MESSAGE_API_CALLBACK!; // 01012341234 (하이픈 없이)
  const call_block = '0'; // 080 수신거부 사용안함
  const send_reserve = '0'; // 즉시발송

  // dstaddr: 여러 명이면 "01011112222|01033334444" 형식
  const dstaddr = phone.replace(/-/g, '');

  // 파라미터를 URLSearchParams로 변환
  const params = new URLSearchParams();
  params.append('api_key', api_key);
  params.append('msg', msg);
  params.append('callback', callback);
  params.append('dstaddr', dstaddr);
  params.append('send_reserve', send_reserve);
  params.append('call_block', call_block);

  // 실제 요청
  const response = await fetch('http://221.139.14.136/APIV2/API/sms_send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: params.toString(),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
