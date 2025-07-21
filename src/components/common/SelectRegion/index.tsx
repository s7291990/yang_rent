'use client';
import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { Modal } from '@/components/common';
import Link from 'next/link';
import {
  fetchAddress,
  fetchCarList,
  fetchNegligenceList,
} from '@/feature/modal/selectRegion/controller';
import {
  useAddressStore,
  useCarStore,
  useNegligenceStore,
} from '@/feature/modal/selectRegion/store';
import clsx from 'clsx';

type SelectType = 'region' | 'carType' | 'negligence';

interface SelectRegionProps {
  variant: SelectType;
  isSelectRegionOpen: boolean;
  onClose?: () => void;
  onSelectRegion?: (value: string) => void;
}

export default function index({
  variant = 'region',
  isSelectRegionOpen,
  onClose,
  onSelectRegion,
}: SelectRegionProps) {
  const address = useAddressStore((state) => state.Address);
  const car = useCarStore((state) => state.CarList); // CarItem[]
  const negligence = useNegligenceStore((state) => state.NegligenceList);

  const [selectedSido, setSelectedSido] = useState<string | null>(null);
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [selectedNegligence, setSelectedNegligence] = useState<string | null>(null);

  // areaList01: 시/도 목록
  const areaList01 = address.map((item) => item.sido);

  // areaList02: 선택된 시/도의 시/군/구 목록
  const areaList02 = selectedSido
    ? address.find((item) => item.sido === selectedSido)?.sigungu || []
    : [];

  // 차종 목록
  const carList01 = Array.from(new Set(car.map((item) => item.manufacturer)));

  // areaList02: 선택된 시/도의 시/군/구 목록
  const carList02 = selectedCar
    ? car.filter((item) => item.manufacturer === selectedCar)
    : [];

  // 과실여부 목록
  const negligenceList01 = negligence.map((item) => item.negligence);

  // areaList02: 선택된 시/도의 시/군/구 목록
  // (불필요한 부분이므로 삭제)

  const variantTitle = {
    region: '지역',
    carType: '차종',
    negligence: '과실여부',
  };

  // 시/군/구 클릭 시 호출
  const handleSigunguClick = (sigungu: string) => {
    if (selectedSido && onSelectRegion) {
      onSelectRegion(`${selectedSido} / ${sigungu}`);
    }
    onClose?.();
  };

  // 차량 클릭 시 호출
  const handleCarClick = (car: string) => {
    if (selectedCar && onSelectRegion) {
      onSelectRegion(`${selectedCar} / ${car}`);
    }
    onClose?.();
  };

  // 과실여부 클릭 시 호출
  const handleNegligenceClick = (negligence: string) => {
    if (onSelectRegion) {
      onSelectRegion(negligence);
    }
    onClose?.();
  };

  useEffect(() => {
    fetchAddress();
    fetchCarList();
    fetchNegligenceList();
    // fetchCompletes().then((result) => {
    //   //setData(result);
    //   console.log(result);
    // });
  }, []);

  useEffect(() => {
    if (
      isSelectRegionOpen &&
      variant === 'region' &&
      areaList01.length > 0 &&
      (!selectedSido || !areaList01.includes(selectedSido))
    ) {
      setSelectedSido(areaList01[0]);
    }
  }, [isSelectRegionOpen, variant, areaList01, selectedSido]);

  useEffect(() => {
    if (
      isSelectRegionOpen &&
      variant === 'carType' &&
      carList01.length > 0 &&
      (!selectedCar || !carList01.includes(selectedCar))
    ) {
      setSelectedCar(carList01[0]);
    }
  }, [isSelectRegionOpen, variant, carList01, selectedCar]);

  return (
    <Modal
      title={variantTitle[variant as keyof typeof variantTitle]}
      isOpen={isSelectRegionOpen}
      onClose={onClose}
    >
      <div className={styles.searchContainer}>
        {/* <div className={styles.searchForm}>
          <input
            type="text"
            className={styles.input}
            placeholder="국내 지역명, 역, 건물 이름으로 검색"
          />
        </div> */}
        {variant === 'region' && (
          <div className={styles.searchResult}>
            <div className={styles.areaList01}>
              <div className={styles.title}>전체지역</div>
              <ul>
                {areaList01.map((sido) => (
                  <li key={sido}>
                    <Link
                      href="#"
                      className={clsx({ [styles.on]: selectedSido === sido })}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedSido(sido);
                      }}
                    >
                      {sido}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.areaList02}>
              <ul>
                {areaList02.map((sigungu) => (
                  <li key={sigungu}>
                    <Link href="#" onClick={(e) => {
                      e.preventDefault();
                      handleSigunguClick(sigungu);
                    }}
                    >
                      {sigungu}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {variant === 'carType' && (
          <div className={styles.searchResult}>
            <div className={styles.areaList01}>
              <div className={styles.title}>전체차종</div>
              <ul>
                {carList01.map((manufacturer, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className={clsx({ [styles.on]: selectedCar === manufacturer })}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedCar(manufacturer);
                      }}
                    >
                      {manufacturer}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.areaList02}>
              <ul>
                {carList02.map((car, index) => (
                  <li key={index}>
                    <Link href="#" onClick={(e) => {
                      e.preventDefault();
                      handleCarClick(car.name);
                    }}
                    >
                      {car.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {variant === 'negligence' && (
          <div className={styles.searchResult}>
            <div className={clsx(styles.areaList01, styles.fullType)}>
              <div className={styles.title}>전체 목록</div>
              <ul>
                {negligenceList01.map((negligence, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNegligenceClick(negligence);
                      }}
                    >
                      {negligence}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
