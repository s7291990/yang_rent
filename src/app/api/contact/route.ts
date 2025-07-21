import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { name, phone, message } = await req.json();

  // Gmail SMTP 설정 (2단계 인증 시 앱 비밀번호 필요)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // 구글 계정
      pass: process.env.GMAIL_PASS, // 앱 비밀번호
    },
  });

  try {
    await transporter.sendMail({
      from: `"1:1문의" <${process.env.GMAIL_USER}>`,
      //to: process.env.GMAIL_USER, // 본인 또는 수신자 이메일
      to: ['sungjin.yang6@gmail.com', process.env.GMAIL_USER].join(','),
      subject: `[1:1문의] ${name} (${phone})`,
      text: message,
      html: `<b>이름:</b> ${name}<br/><b>연락처:</b> ${phone}<br/><b>문의내용:</b><br/>${message.replace(/\n/g, '<br/>')}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
