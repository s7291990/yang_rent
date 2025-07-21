import React, { useState } from 'react';
import styles from './index.module.css';
import clsx from 'clsx';
import SelectRegion from '@/components/common/SelectRegion';

type SelectType = 'region' | 'carType' | 'negligence';

interface InputProps {
  label?: string;
  className?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  variant?: SelectType;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export default function FormSelect({
  label = '',
  className,
  placeholder = '지역을 선택하세요',
  name,
  value,
  variant = 'region',
  onClick,
  onChange,
  required,
}: InputProps) {
  const [isSelectRegionOpen, setIsSelectRegionOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');

  const handleSelectRegionOpen = () => setIsSelectRegionOpen(true);
  const handleSelectRegionClose = () => setIsSelectRegionOpen(false);

  // value prop이 바뀌면 내부 상태도 동기화
  React.useEffect(() => {
    if (value !== undefined) setSelectedValue(value);
  }, [value]);

  return (
    <>
      <div className={clsx(styles.formItem, className)}>
        {label && (
          <div className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </div>
        )}
        <div className={styles.formCols}>
          <input
            type="text"
            className={styles.input}
            name={name}
            value={selectedValue}
            onChange={onChange}
          />
          <button
            type="button"
            className={clsx(styles.btnSelect, { [styles.on]: selectedValue })}
            onClick={handleSelectRegionOpen}
          >
            <span>
              {selectedValue && selectedValue.trim() !== '' ? selectedValue : placeholder}
            </span>
          </button>
        </div>
      </div>
      <SelectRegion
        isSelectRegionOpen={isSelectRegionOpen}
        variant={variant}
        onClose={handleSelectRegionClose}
        onSelectRegion={(val) => {
          setSelectedValue(val);
          if (onChange) {
            onChange({ target: { value: val, name } } as React.ChangeEvent<HTMLInputElement>);
          }
          handleSelectRegionClose();
        }}
      />
    </>
  );
}
