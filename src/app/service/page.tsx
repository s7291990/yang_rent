'use client';
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Pagination, { PaginationProps } from '@/components/common/Pagination';
import { fetchNoticeList } from '@/feature/notice/controller';
import { NoticeRdo } from '@/feature/notice/model';
import { useNoticeListStore, useNoticeViewStore } from '@/feature/notice/store';

export default function page() {
  return (
    <main className={styles.main}>
      {/** 서비스 소개 */}
      <div className={styles.serviceAbout}>
        <div className={styles.container}>
          <div className={styles.title}>
            렌터카 예약
            <strong>이제는 더 쉽고 합리적으로!</strong>
          </div>
          <div className={styles.description}>
            사고대차 렌트카 플랫폼으로 시작한 올림포스가
            <br />
            제휴 렌터카 인프라를 기반으로
            <br />
            일반 고객을 위한 단기렌트 서비스를 새롭게 선보입니다.
          </div>
        </div>
        <div className={styles.image}>
          <img src="/image/etc/etc-service-about.png" />
        </div>
      </div>

      {/** 서비스 이벤트 */}
      <div className={styles.serviceEvent}>
        <div className={styles.container}>
          <div className={styles.title}>
            오픈 기념! 첫 이용 고객 대상 이벤트
            <strong>올림포스 카카오 채널 추가 시 렌트 비용 50% 할인!</strong>
          </div>
          <div className={styles.description}>KT 지니TV 고객 전용 추가 10% 할인</div>
          <button type="button">자세히 보기</button>
        </div>
      </div>

      {/** 서비스 이용 방법 */}
      <div className={styles.serviceUse}>
        <div className={styles.title}>올림포스 렌터카 이용 방법</div>
        <ul>
          <li>
            <div className={styles.container}>
              <div className={styles.subject}>빠른 예약 문의</div>
              <div className={styles.description}>
                간편하게 차량을 추천받고 싶다면?
                <br />
                고객명, 연락처, 이용 지역, 원하는 차종만 입력해주세요.
                <br />
                <br />
                전문 상담원이 카카오톡 채널 또는 유선 상담을 통해 조건에 맞는 차량을 찾아
                매칭해드립니다.
                <br />
                <br />
                차량 선택 후 결제까지 원스톱으로 진행됩니다.
              </div>
              <button type="button">1:1렌트 상담하기</button>
            </div>
            <div className={styles.image}>
              <img src="/image/etc/etc-service-use01.jpg" />
            </div>
          </li>
          <li>
            <div className={styles.container}>
              <div className={styles.subject}>직접 차량 선택</div>
              <div className={styles.description}>
                원하는 차량을 직접 선택하고 싶다면?
                <br />
                고객정보, 이용기간, 지역, 차종을 입력 후 선결제해주세요.
                <br />
                <br />
                제휴 렌터카사와의 예약을 도와드리고,
                <br />
                전문 상담원이 추가 정보 확인 및 요청사항을 꼼꼼히 챙겨드립니다.
              </div>
              <button type="button">단기렌트 예약하기</button>
            </div>
            <div className={styles.image}>
              <img src="/image/etc/etc-service-use02.jpg" />
            </div>
          </li>
          <li>
            <div className={styles.container}>
              <div className={styles.subject}>사고 대차 신청</div>
              <div className={styles.description}>
                사고로 인해 차량이 필요하신가요?
                <br />
                올림포스의 메인 서비스인 사고대차 접수도 간편하게 신청 가능합니다.
                <br />
                <br />
                신청하시면 상담원이 필요한 사항을 추가 확인하여 빠르게 대응해드리며,
                <br />
                사고대차 전용 혜택도 함께 제공됩니다.
              </div>
              <button type="button">1:1렌트 상담하기</button>
            </div>
            <div className={styles.image}>
              <img src="/image/etc/etc-service-use03.jpg" />
            </div>
          </li>
        </ul>
      </div>

      {/** 서비스 고객센터 */}
      <div className={styles.serviceCustomer}>
        <div className={styles.container}>
          <div className={styles.title}>고객의 소리에 귀 기울입니다.</div>
          <div className={styles.description}>
            서비스 초기 단계인 만큼,
            <br />
            불편하셨던 점이나 개선이 필요한 사항이 있다면 언제든지 말씀해주세요.
            <br />
            여러분의 소중한 의견은 더 나은 서비스를 위한 밑거름이 됩니다.
          </div>
          <div className={styles.etc}>
            의견을 남겨주신 고객 중 추첨을 통해 소정의 선물을 드립니다
          </div>
        </div>
        <button type="button">고객센터 바로가기</button>
      </div>

      {/** 서비스 상담 문의 */}
      <div className={styles.serviceContactus}>
        <div className={styles.container}>
          <div className={styles.title}>예약 및 상담 문의</div>
          <div className={styles.tel}>1533-7120</div>
          <button type="button">사고대차 문의하기</button>
        </div>
      </div>
    </main>
  );
}
