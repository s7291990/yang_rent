'use client';
import React, { useState } from 'react';
import styles from './page.module.css';
import { FormItem, FormTextarea } from '@/components/common';

export default function Page() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, message }),
    });
    const data = await res.json();
    if (data.success === true) {
      alert('메일이 성공적으로 전송되었습니다!');
      setName('');
      setPhone('');
      setMessage('');
    } else {
      alert('메일 전송에 실패했습니다.');
    }
  };

  return (
    <main className={styles.main}>
      {/** 서브 헤더 영역
      <div className={styles.subVisual}>
        <div className={styles.title}>공지사항</div>
      </div> */}

      {/** 목록 상세 영역 */}
      <div className={styles.contactusWrapper}>
        <div className={styles.rela}>
          <div className={styles.title}>지금 바로 문의해 보세요</div>
          <div className={styles.formWrapper}>
            <FormItem
              label="성함"
              placeholder="이름을 입력하세요"
              type="text"
              name="name"
              required={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormItem
              label="휴대폰 번호"
              placeholder="010-0000-0000"
              type="text"
              name="name"
              required={true}
              value={phone}
              maxLength={13}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                let value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 허용
                // 자동 하이픈 처리
                if (value.length < 4) {
                  // 010
                } else if (value.length < 8) {
                  value = value.replace(/(\d{3})(\d{1,4})/, '$1-$2');
                } else {
                  value = value.replace(/(\d{3})(\d{4})(\d{0,4})/, '$1-$2-$3');
                }
                setPhone(value);
              }}
            />
            <FormTextarea
              label="문의내용"
              placeholder="문의 내용을 입력해주세요"
              name="name"
              required={true}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="button" className={styles.detailButton} onClick={handleSubmit}>
              문의하기
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
