'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { CarItem, FormItem, FormSelect, Loading, SearchForm } from '@/components/common';
import { fetchCar } from '@/feature/searchResult/controller';
import { Car } from '@/feature/searchResult/model';
import { useCarsStore, useSearchFormStore } from '@/feature/searchResult/store';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { getDateTimeDiff } from '@/feature/payment/helper';

// 결제 정보
import { usePaymentStore } from '@/feature/payment/store';

export default function page() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { searchForm, setSearchForm } = useSearchFormStore();

  const { Payment, setPayment } = usePaymentStore();

  useEffect(() => {
    const daysAndHours = getDateTimeDiff(
      searchForm.startDate,
      '00:00', // 또는 searchForm.startTime
      searchForm.endDate,
      '00:00', // 또는 searchForm.endTime
    );
    console.log(daysAndHours);
    setPayment({
      ...(Payment ?? {}),
      startDate: searchForm.startDate,
      endDate: searchForm.endDate,
      region: searchForm.region,
      rentDate: Number(daysAndHours.days),
    });
  }, [searchForm]);

  const cars = useCarsStore((state) => state.Cars);
  useEffect(() => {
    fetchCar();
    fetchCar().finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    setCarData(cars);
  }, [cars]);

  // 데이터 상태관리
  const [carData, setCarData] = useState<Car[]>(cars);

  // 탭메뉴 상태관리
  const [activeMenu, setActiveMenu] = useState<number>(0);

  // 탭 이벤트 관리
  const handleMenu = (index: number, manufacturerCode: string) => {
    setActiveMenu(index);
    console.log(index, manufacturerCode);
    // 전체
    if (index === 0) {
      setCarData(cars);
    } else {
      setCarData(cars.filter((item) => item.manufacturerCode === manufacturerCode));
    }
  };

  const seen = new Set();
  const uniqueManufacturers = cars.filter((item) => {
    const key = `${item.manufacturer}|${item.manufacturerCode}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // 자동차 클릭시

  // 렌트 아이템 클릭시
  const goToItemDetail = (id: number) => {
    let detailCarInfo = cars.find((item) => item.id === id);
    console.log(detailCarInfo);
    if (!detailCarInfo) return;
    setPayment({
      ...(Payment ?? {}),
      id: detailCarInfo.id,
      carCompany: detailCarInfo.manufacturer,
      carName: detailCarInfo.name,
      defaultPrice: Number(String(detailCarInfo.price).replace(/,/g, '')),
      oneDayPrice: Number(String(detailCarInfo.price).replace(/,/g, '')),
      carType:
        detailCarInfo.oilType[0] === 'G'
          ? '가솔린'
          : detailCarInfo.oilType[0] === 'D'
            ? '디젤'
            : detailCarInfo.oilType[0] === 'L'
              ? 'LPG'
              : detailCarInfo.oilType[0] === 'E'
                ? '전기차'
                : '하이브리드', // 유종
      // 금액 초기화
      totalPrice: 0,
      cwdAgeRange: '',
      customerEmail: '',
      customerInsuranceAge: '',
      customerBirthday: '',
      customerPhone: '',
      customerName: '',
      cdwTotal: 0,
      cdwRange: 0,
      cdwAge: 0,
    });
    console.log(Payment);
    router.push('/payment');
  };
  const rentalStartRef = useRef<HTMLInputElement>(null);
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
              console.log(searchForm);
            }}
          />

          <button type="button" className={styles.btnReservation}>
            예약 시작하기
          </button>
        </SearchForm>

        {/** 지역별 인기 차종 영역 */}
        <div className={styles.carListContainer}>
          <div className={styles.rela}>
            <div className={styles.title}>검색결과</div>
            <div className={styles.helpWrap}>
              <Link href="#" onClick={(e) => e.preventDefault()}>
                <img src="/image/ico/ico-help.svg" />
                <span>유종은 어떻게 확인하나요?</span>
                <div className={styles.tooltip}>
                  <ul>
                    <li>
                      <span className={styles.ucateKey}>G</span>
                      <span className={styles.ucateValue}>가솔린</span>
                    </li>
                    <li>
                      <span className={styles.ucateKey}>D</span>
                      <span className={styles.ucateValue}>디젤</span>
                    </li>
                    <li>
                      <span className={styles.ucateKey}>L</span>
                      <span className={styles.ucateValue}>LPG</span>
                    </li>
                    <li>
                      <span className={styles.ucateKey}>E</span>
                      <span className={styles.ucateValue}>전기차</span>
                    </li>
                    <li>
                      <span className={styles.ucateKey}>H</span>
                      <span className={styles.ucateValue}>하이브리드</span>
                    </li>
                  </ul>
                </div>
              </Link>
            </div>
          </div>

          <div className={styles.categoryMenuWrapper}>
            <ul className={styles.categoryMenuList}>
              <li>
                <Link
                  href="#"
                  className={clsx({ [styles.on]: activeMenu === 0 })}
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenu(0, 'all');
                  }}
                >
                  전국
                </Link>
              </li>
              {uniqueManufacturers.map((item, index) => (
                <li key={index}>
                  <Link
                    href="#"
                    className={clsx({ [styles.on]: activeMenu === index + 1 })}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenu(index + 1, item.manufacturerCode);
                    }}
                  >
                    {item.manufacturer}
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
                  type={item.oilType}
                  image={item.image}
                  price={item.price}
                  onClick={(e) => {
                    e.preventDefault();
                    goToItemDetail(item.id);
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
