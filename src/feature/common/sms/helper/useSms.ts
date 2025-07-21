import { useState } from 'react';

export function useSms(defaultPhone = '', defaultMsg = '') {
  const [phone, setPhone] = useState(defaultPhone);
  const [msg, setMsg] = useState(defaultMsg);
  const [result, setResult] = useState<any>(null);

  const sendSms = async (phoneParam?: string, msgParam?: string, showAlert: boolean = true) => {
    const phoneToSend = phoneParam || phone;
    const msgToSend = msgParam || msg;
    const res = await fetch('/api/sms/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: phoneToSend, msg: msgToSend }),
    });
    const data = await res.json();
    setResult(data);
    // result가 1일 때만 성공 알림
    if (showAlert) {
      if (data.result === "100") {
        alert('정상적으로 문자 전송되었습니다.');
      } else {
        alert(`문자 전송 실패 (코드: ${data.result})`);
      }
    }
    return data;
  };

  return {
    phone,
    setPhone,
    msg,
    setMsg,
    result,
    setResult,
    sendSms,
  };
}
