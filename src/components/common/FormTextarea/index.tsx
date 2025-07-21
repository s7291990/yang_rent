import React from 'react';
import styles from './index.module.css';
import clsx from 'clsx';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import 'rsuite/dist/rsuite.min.css';

interface InputProps {
  label?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // startDate
  name?: string;
  readonly?: boolean;
  maxLength?: number;
  required?: boolean;
}

export default function index({
  label = ' ',
  className,
  placeholder = '문의 내용을 입력해주세요',
  value,
  onChange,
  name,
  readonly = false,
  maxLength,
  required,
}: InputProps) {
  return (
    <>
      <div className={clsx(styles.formItem, className)}>
        <div className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </div>
        <div className={styles.formCols}>
          <textarea
            className={clsx(styles.textarea)}
            readOnly={readonly}
            placeholder={placeholder}
            onChange={(e) => {
              if (onChange) onChange(e);
            }}
            name={name}
            maxLength={maxLength}
            value={value}
          />
        </div>
      </div>
    </>
  );
}

// 시간 포맷 함수 추가
function formatTime(date: Date | null) {
  if (!date) return '';
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}
