'use client';
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Pagination, { PaginationProps } from '@/components/common/Pagination';
import { fetchNoticeList } from '@/feature/notice/controller';
import { NoticeRdo } from '@/feature/notice/model';
import { useNoticeListStore, useNoticeViewStore } from '@/feature/notice/store';
import { Loading } from '@/components/common';
import { tr } from 'date-fns/locale';

export default function page() {
  const [loading, setLoading] = useState(true);
  const notices = useNoticeListStore((state) => state.NoticeList);

  // 데이터 상태관리
  const [pageData, setPageData] = useState<NoticeRdo[]>(notices);
  useEffect(() => {
    fetchNoticeList();
    fetchNoticeList().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setPageData(notices);
    setPaginationProps({ ...paginationProps, totalCount: notices.length });
  }, [notices]);

  // 현재페이지 상태값
  const [current, setCurrent] = useState<number>(1);

  useEffect(() => {
    pageUpdate();
  }, [current]);

  // 현재페이지 상태값에 따른 데이터 업데이트
  const pageUpdate = () => {
    const startIndex = (paginationProps.pageNo - 1) * paginationProps.countPerPage;
    const endIndex = startIndex + paginationProps.countPerPage;
    const sliceData = notices.slice(startIndex, endIndex);
    setPageData(sliceData);
  };

  // 페이징 옵션
  const [paginationProps, setPaginationProps] = useState<Omit<PaginationProps, 'onChange'>>({
    pageNo: current,
    countPerPage: 10,
    totalCount: notices.length,
  });

  const router = useRouter();

  const handleView = (event: React.MouseEvent<HTMLAnchorElement>, id: number) => {
    event.preventDefault();
    const viewData = pageData.find((item) => item.id === id);
    console.log(viewData);
    // store에 상세 데이터 저장
    useNoticeViewStore.getState().setNoticeView(viewData as NoticeRdo);
    // 상세 페이지로 이동
    router.push('/notice/view');
  };

  return (
    <>
      <main className={styles.main}>
        {/** 서브 헤더 영역 */}
        <div className={styles.subVisual}>
          <div className={styles.title}>공지사항</div>
        </div>

        {/** 목록 영역 */}
        <div className={styles.noticeWrapper}>
          <table>
            <colgroup>
              <col className={styles.mhide} width="10%" />
              <col width="" />
              <col width="15%" />
              <col width="25%" />
            </colgroup>
            <thead>
              <tr>
                <th className={styles.mhide}>번호</th>
                <th>문의 제목</th>
                <th>작성자</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((item) => (
                <tr key={item.id}>
                  <td className={styles.mhide}>{item.id}</td>
                  <td className={styles.al}>
                    <Link
                      href="#"
                      onClick={(e) => {
                        handleView(e, item.id);
                      }}
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/** 페이징 영역 */}
        <Pagination
          {...paginationProps}
          onChange={(pageNo) => {
            setPaginationProps((prev) => {
              return {
                ...prev,
                pageNo: pageNo,
              };
            });
            setCurrent(pageNo);
          }}
        />
      </main>
      {/** 로딩 모달 */}
      {loading && <Loading />}
    </>
  );
}
