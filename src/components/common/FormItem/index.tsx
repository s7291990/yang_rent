import React, { forwardRef, useEffect, useRef, useState } from 'react';
import styles from './index.module.css';
import clsx from 'clsx';
import { Calendar, DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { TimePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import moment from 'moment';
import { isMobile } from 'react-device-detect';

export type DataType = 'datepicker' | 'timepicker' | 'range';

interface DateRangeChangeEvent {
  target: {
    value: {
      startDate: string;
      endDate: string;
    };
    name: string;
  };
}

interface InputProps {
  label?: string;
  className?: string;
  placeholder?: string;
  value?: string; // startDate
  endValue?: string; // endDate
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // startDate
  onChangeEnd?: (e: DateRangeChangeEvent | React.ChangeEvent<HTMLInputElement>) => void; // endDate
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  name?: string;
  type?: string;
  readonly?: boolean;
  dataType?: DataType;
  maxLength?: number;
  required?: boolean;
}

const FormItem = forwardRef<HTMLInputElement, InputProps>(function FormItem(
  {
    label = ' ',
    className,
    placeholder = '이름을 입력하세요',
    value,
    endValue,
    onChange,
    onChangeEnd,
    name,
    dataType,
    type = 'text',
    readonly = false,
    maxLength,
    onClick,
    required,
  },
  ref,
) {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showDateRange, setShowDateRange] = useState(false);
  // 날짜를 YYYY-MM-DD 형식으로 변환
  const formatDate = (date: Date | null) =>
    date
      ? date
        .toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/\.\s*$/, '')
      : '';

  const formatDate01 = (date: Date | null, format: string = 'YYYY-MM-DD') => {
    if (!date) return '';
    return moment(date).format(format);
  };

  const getDefaultTime = () => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  };

  const [time, setTime] = useState<Date | null>(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const timePickerRef = useRef<HTMLDivElement>(null);
  const dateRangeRef = useRef<HTMLDivElement>(null);

  // value가 바뀔 때 time 상태 동기화 (timepicker용)
  useEffect(() => {
    if (dataType === 'timepicker' && value) {
      const [hours, minutes] = value.split(':');
      const date = new Date();
      date.setHours(Number(hours), Number(minutes), 0, 0);
      setTime(date);
    }
  }, [value, dataType]);

  // value가 바뀔 때 date 상태 동기화 (datepicker용)
  useEffect(() => {
    if (dataType === 'datepicker' && value) {
      let dateObj;
      if (value.includes('.')) {
        dateObj = moment(value, 'YYYY. MM. DD').toDate();
      } else {
        dateObj = moment(value, 'YYYY-MM-DD').toDate();
      }
      setDate(dateObj);
    }
  }, [value, dataType]);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection',
    },
  ]);

  // value, endValue가 바뀔 때마다 range 달력의 state를 동기화
  useEffect(() => {
    if (dataType === 'range' && value && endValue) {
      setState([
        {
          startDate: moment(value, 'YYYY-MM-DD').toDate(),
          endDate: moment(endValue, 'YYYY-MM-DD').toDate(),
          key: 'selection',
        },
      ]);
    }
  }, [value, endValue, dataType]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
      if (timePickerRef.current && !timePickerRef.current.contains(event.target as Node)) {
        setShowTimePicker(false);
      }
      if (dateRangeRef.current && !dateRangeRef.current.contains(event.target as Node)) {
        setShowDateRange(false);
      }
    }

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    if (showTimePicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    if (showDateRange) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar, showTimePicker, showDateRange]);

  return (
    <>
      <div className={clsx(styles.formItem, className)}>
        <div className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </div>
        <div className={styles.formCols}>
          {dataType !== 'timepicker' && dataType !== 'range' && (
            <input
              ref={ref}
              type={type}
              className={clsx(styles.input, {
                [styles.datepicker]: dataType === 'datepicker',
              })}
              readOnly={readonly}
              placeholder={placeholder}
              value={dataType === 'datepicker' ? formatDate(date) : value}
              onChange={onChange}
              onClick={(e) => {
                if (dataType === 'datepicker') setShowCalendar(true);
                if (onClick) onClick(e);
              }}
              name={name}
              maxLength={maxLength}
            />
          )}

          {dataType === 'range' && (
            <>
              <input
                ref={ref}
                type={type}
                className={clsx(styles.input, {
                  [styles.datepicker]: dataType === 'range',
                })}
                readOnly={readonly || dataType === 'range'} // range 타입이면 readOnly
                placeholder={placeholder}
                value={
                  dataType === 'range'
                    ? value && value.trim() !== ''
                      ? value
                      : formatDate(state[0].startDate)
                    : value
                }
                onChange={onChange}
                onClick={() => {
                  if (dataType === 'range') setShowDateRange(true);
                }}
                name="startDate"
              />
              <input
                type={type}
                className={clsx(styles.input, {
                  [styles.datepicker]: dataType === 'range',
                })}
                //readOnly={readonly || dataType === 'range'}
                placeholder={placeholder}
                value={
                  dataType === 'range'
                    ? endValue && endValue.trim() !== ''
                      ? endValue
                      : formatDate(state[0].endDate)
                    : endValue
                }
                onChange={onChangeEnd}
                onClick={() => {
                  if (dataType === 'range') setShowDateRange(true);
                }}
                name="endDate"
              />
            </>
          )}

          {dataType === 'timepicker' && (
            <TimePicker
              format="HH:mm"
              hideHours={(hour) => hour < 10 || hour > 16}
              onChange={(value: Date | null) => {
                if (value) {
                  const hour = value.getHours();
                  if (hour < 10 || hour > 16) {
                    alert('10:00~16:59 사이만 선택 가능합니다.');
                    return;
                  }
                }
                setTime(value);
                setShowTimePicker(false);
                if (onChange) {
                  onChange({
                    target: {
                      value: formatTime(value),
                      name: name,
                    },
                  } as React.ChangeEvent<HTMLInputElement>);
                }
              }}
              value={time || getDefaultTime()}
            />
          )}
        </div>
        {dataType === 'datepicker' && showCalendar && (
          <div className={styles.calendarContainer} ref={calendarRef}>
            <Calendar
              date={date}
              locale={ko}
              minDate={new Date()} // 오늘 이전은 비활성화
              onChange={(item: Date) => {
                setDate(item);
                setShowCalendar(false);
                if (onChange) {
                  onChange({
                    target: {
                      value: formatDate01(item), // 원
                      name: name,
                    },
                  } as React.ChangeEvent<HTMLInputElement>);
                }
              }}
            />
          </div>
        )}
        {dataType === 'range' && showDateRange && (
          <div className={styles.calendarContainer} ref={dateRangeRef}>
            <DateRange
              minDate={new Date()} // 오늘 이전은 비활성화
              onChange={(item: { selection: { startDate: Date; endDate: Date; key: string } }) => {
                const start = item.selection.startDate;
                let end = item.selection.endDate;
                // 29일(0일 포함) 초과 시 endDate를 startDate + 28일로 제한
                const maxEnd = new Date(start);
                maxEnd.setDate(maxEnd.getDate() + 28);
                if (end > maxEnd) end = maxEnd;
                setState([{ ...item.selection, endDate: end }]);
                // 상위로 값 전달 (startDate, endDate 모두)
                if (onChangeEnd) {
                  onChangeEnd({
                    target: {
                      value: {
                        startDate: formatDate(start),
                        endDate: formatDate(end),
                      },
                      name: 'dateRange', // 커스텀 네이밍
                    },
                  });
                  // 시작일과 종료일이 다를 때만 닫기
                  if (start.getTime() !== end.getTime()) {
                    setShowDateRange(false);
                  }
                }
              }}
              ranges={state}
              months={isMobile ? 1 : 2}
              locale={ko}
              moveRangeOnFirstSelection={false}
              editableDateInputs={true}
              direction="horizontal"
              staticRanges={[]}
              inputRanges={[]}
            />
          </div>
        )}
      </div>
    </>
  );
});

export default FormItem;

// 시간 포맷 함수 추가
function formatTime(date: Date | null) {
  if (!date) return '';
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}
