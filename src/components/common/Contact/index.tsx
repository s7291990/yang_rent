'use client';
import React from 'react';
import styles from './index.module.css';
import { FormItem, FormSelect, Modal } from '@/components/common';
import { useSms } from '@/feature/common/sms/helper/useSms';
import { useContactStore } from '@/feature/modal/contact/store';

interface ContactProps {
  isContactOpen: boolean;
  onClose?: () => void;
}

export default function Contact({ isContactOpen, onClose }: ContactProps) {
  //phone, setPhone, msg, setMsg, result, setResult,
  const { sendSms } = useSms('', '');
  const { Contact, setContact } = useContactStore();
  const [agree, setAgree] = React.useState(false);

  React.useEffect(() => {
    if (!Contact.age) {
      setContact({ ...Contact, age: '21' });
    }
  }, []);

  // 버튼 클릭 시 store에 저장 (이미 store에 반영된 값이므로 setContact(Contact) 호출)
  const handleSaveContact = () => {
    if (!agree) {
      alert('개인정보 수집 및 이용에 동의해 주세요.');
      return;
    }
    if (!Contact.name) {
      alert('이름을 입력해주세요.');
      return;
    }
    if (!Contact.phone) {
      alert('휴대폰 번호를 입력해주세요.');
      return;
    }
    if (!Contact.carNumber) {
      alert('차량번호를 입력해주세요.');
      return;
    }
    if (!Contact.strokes) {
      alert('배기량을 입력해주세요.');
      return;
    }
    if (!Contact.region) {
      alert('지역을 선택해주세요.');
      return;
    }
    setContact({ ...Contact }); // 필요시 추가 가공 가능
    console.log(Contact);
    // 고객
    sendSms(
      Contact.phone,
      `${Contact.name}고객님, 사고대차 문의가 정상 접수되었습니다.
      \n▶ 문의 내용:
      \nㆍ문의자: ${Contact.name}/${Contact.phone}
      \nㆍ사고차량: ${Contact.carNumber}
      \nㆍ운전자 나이: 만${Contact.age}세 이상
      \n빠른 차량 배정을 위해 담당자가 곧 연락드리겠습니다.`,
    );
    // 운영자
    sendSms(
      process.env.NEXT_PUBLIC_ADMIN_PHONE,
      `[사고대차예약] 도착했습니다.
      \n▶ 문의 내용:
      \nㆍ문의자: ${Contact.name}/${Contact.phone}
      \nㆍ사고차량: ${Contact.carNumber}
      \nㆍ운전자 나이: 만${Contact.age}세 이상`,
      false,
    );
    if (onClose) onClose(); // 저장 후 모달 닫기
  };

  return (
    <Modal title="사고대차 문의" isOpen={isContactOpen} onClose={onClose}>
      <div className={styles.contactForm}>
        <FormItem
          className={styles.formItem}
          label="성함"
          required={true}
          placeholder="이름을 입력하세요"
          type="text"
          name="name"
          value={Contact.name}
          onChange={(e) => setContact({ ...Contact, name: e.target.value })}
        />
        <FormItem
          className={styles.formItem}
          label="휴대폰 번호"
          required={true}
          placeholder="010-0000-0000"
          type="text"
          name="phone"
          value={Contact.phone}
          maxLength={13}
          onChange={(e) => {
            let value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 허용
            // 자동 하이픈 처리
            if (value.length < 4) {
              // 010
            } else if (value.length < 8) {
              value = value.replace(/(\d{3})(\d{1,4})/, '$1-$2');
            } else {
              value = value.replace(/(\d{3})(\d{4})(\d{0,4})/, '$1-$2-$3');
            }
            setContact({ ...Contact, phone: value });
          }}
        />
        <FormItem
          className={styles.formItem}
          label="사고 차량"
          required={true}
          placeholder="예) 아반떼 (연식 선택입력)"
          type="text"
          name="carNumber"
          value={Contact.carNumber}
          onChange={(e) => setContact({ ...Contact, carNumber: e.target.value })}
        />
        <FormItem
          className={styles.formItem}
          label="배기량"
          placeholder="예) 2000cc"
          type="text"
          name="strokes"
          value={Contact.strokes}
          onChange={(e) => setContact({ ...Contact, strokes: e.target.value })}
        />

        <FormSelect
          label="지역"
          className={styles.formItem}
          required={true}
          name="region"
          value={Contact.region}
          onChange={(e) => setContact({ ...Contact, region: e.target.value })}
        />
        <FormSelect
          placeholder="(선택입력) 과실여부를 선택하세요"
          label="과실여부"
          name="negligence"
          variant="negligence"
          value={Contact.negligence}
          className={styles.formItem}
          onChange={(e) => setContact({ ...Contact, negligence: e.target.value })}
        />

        <FormItem
          className={styles.formItem}
          label="보험사"
          placeholder="(선택입력) 보험사명을 입력하세요"
          type="text"
          name="insuranceCompany"
          value={Contact.insuranceCompany}
          onChange={(e) => setContact({ ...Contact, insuranceCompany: e.target.value })}
        />
        <FormItem
          className={styles.formItem}
          label="접수번호"
          placeholder="(선택입력) 접수번호를 입력하세요"
          type="text"
          name="receiptNumber"
          value={Contact.receiptNumber}
          onChange={(e) => setContact({ ...Contact, receiptNumber: e.target.value })}
        />
      </div>

      <div className={styles.ageRadioGroup}>
        <div className={styles.label}>운전자 나이</div>
        <div className={styles.radioGroup}>
          {['만 21세 이상', '만 24세 이상', '만 26세 이상', '만 30세 이상'].map((label, idx) => {
            const value = ['21', '24', '26', '30'][idx];
            return (
              <label key={value}>
                <input
                  type="radio"
                  name="age"
                  value={value}
                  checked={Contact.age === value}
                  onChange={() => setContact({ ...Contact, age: value })}
                />
                <span>{label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className={styles.agreeCheckbox}>
        <label>
          <input
            type="checkbox"
            name="agree"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <span>개인정보 수집 및 이용 동의</span>
        </label>
      </div>

      <button className={styles.btnSubmit} onClick={handleSaveContact}>
        대차 신청하기
      </button>

      <div className={styles.helpMsg}>
        지금 접수하시면 1시간 이내에 전문 상담원이 직접 연락드립니다. (365일 24시간 운영)
      </div>
    </Modal>
  );
}
