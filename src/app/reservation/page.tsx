'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { CarItem, FormItem, FormSelect, Loading, SearchForm } from '@/components/common';
import { fetchCar } from '@/feature/searchResult/controller';
import { Car } from '@/feature/searchResult/model';
import { useCarsStore, useSearchFormStore } from '@/feature/searchResult/store';
import { sortCarsByRegion } from '@/feature/searchResult/helper';
import { useRouter } from 'next/navigation';
import moment from 'moment';

// 결제 정보

export default function Page() {
  // 초기 날짜 설정
  useEffect(() => {
    // 이미 값이 있으면 덮어쓰지 않음 (원하면 조건문 제거)
    if (!searchForm.startDate || !searchForm.endDate) {
      const today = moment().format('YYYY. MM. DD');
      const tomorrow = moment().add(1, 'day').format('YYYY. MM. DD');
      setSearchForm({
        ...searchForm,
        startDate: today,
        endDate: tomorrow,
      });
    }
  }, []);

  const router = useRouter();
  const { searchForm, setSearchForm } = useSearchFormStore();
  //const { Payment, setPayment } = usePaymentStore();
  const cars = useCarsStore((state) => state.Cars);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchCar();
    fetchCar().finally(() => setLoading(false));
  }, []);

  // 데이터 상태관리
  const [activeRegion, setActiveRegion] = useState('all');
  const [carData, setCarData] = useState<Car[]>([]);

  useEffect(() => {
    // cars는 전체 데이터
    setCarData(sortCarsByRegion(cars, activeRegion));
  }, [cars, activeRegion]);

  const regions = [
    { code: 'all', label: '전국' },
    { code: 'seoul', label: '서울' },
    { code: 'busan', label: '부산' },
    { code: 'jeju', label: '제주' },
  ];

  const rentalStartRef = useRef<HTMLInputElement>(null);

  const handleReservation = () => {
    if (!searchForm.region) {
      alert('지역을 선택해 주세요.');
      return;
    }
    //console.log('searchForm in searchResult:', searchForm);
    router.push('/searchResult');
  };

  return (
    <>
      <main className={styles.main}>
        {/** 빠른 예약 영역 */}
        <SearchForm subTitle="차량예약" dataType="sub">
          <FormSelect
            className={styles.formSelect}
            label="지역"
            name="region"
            variant="region"
            value={searchForm.region}
            onChange={(e) => {
              setSearchForm({ ...searchForm, region: e.target.value });
              setTimeout(() => {
                rentalStartRef.current?.focus();
                rentalStartRef.current?.click(); // 포커스 후 클릭 이벤트도 발생시켜 달력 자동 오픈
              }, 0);
            }}
          />
          <FormItem
            ref={rentalStartRef}
            className={styles.formItem}
            label="일정"
            placeholder="대여 시작일을 선택하세요"
            type="text"
            dataType="range"
            value={searchForm.startDate}
            endValue={searchForm.endDate}
            onChange={(e) => {
              setSearchForm({ ...searchForm, startDate: e.target.value });
              console.log(searchForm);
            }}
            onChangeEnd={(e) => {
              const { startDate, endDate } = e.target.value as unknown as {
                startDate: string;
                endDate: string;
              };
              setSearchForm({
                ...searchForm,
                startDate,
                endDate,
              });
            }}
          />

          <button type="button" className={styles.btnReservation} onClick={handleReservation}>
            예약 시작하기
          </button>
        </SearchForm>

        {/** 지역별 인기 차종 영역 */}
        <div className={styles.carListContainer}>
          <div className={styles.rela}>
            <div className={styles.title}>지역별 인기 차종</div>
            <div className={styles.desc}>지역별 인기 차종을 확인해 보세요</div>
          </div>

          <div className={styles.categoryMenuWrapper}>
            <ul className={styles.categoryMenuList}>
              {regions.map((region) => (
                <li key={region.code}>
                  <Link
                    href="#"
                    className={activeRegion === region.code ? styles.on : ''}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveRegion(region.code);
                    }}
                  >
                    {region.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.carListItem}>
            <ul>
              {carData.map((item) => (
                <CarItem
                  key={item.id}
                  title={item.name}
                  desc={item.year}
                  image={item.image}
                  onClick={(e) => {
                    e.preventDefault();
                    //goToItemDetail();
                  }}
                />
              ))}
            </ul>
          </div>
        </div>
      </main>

      {/** 로딩 모달 */}
      {loading && <Loading />}
    </>
  );
}
