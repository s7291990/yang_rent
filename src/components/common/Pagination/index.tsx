import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import clsx from 'clsx';

export interface PaginationProps {
  pageNo: number;
  countPerPage: number;
  totalCount: number;
  onChange: (pageNo: number) => void;
}

interface IPage {
  pageNo: number;
  isSkip: boolean;
  isSelected: boolean;
}

export default function Pagination(props: PaginationProps) {
  const { pageNo = 1, countPerPage = 10, totalCount = 0, onChange } = props;

  const [pages, setPages] = useState<IPage[]>([]);
  const [totalPages, setTotalPages] = useState<number>(Math.ceil(totalCount / countPerPage));

  useEffect(() => {
    setTotalPages(Math.ceil(totalCount / countPerPage));
  }, [totalCount, countPerPage]);

  useEffect(() => {
    if (totalPages === 0) {
      setPages([]);
      return;
    }
    const pageArr: IPage[] = Array(totalPages)
      .fill('')
      .map((_, i) => ({
        pageNo: i + 1,
        isSkip: false,
        isSelected: i + 1 === pageNo,
      }));
    setPages(pageArr);
  }, [pageNo, totalPages]);

  const handleClick = (changeNo: number) => {
    if (changeNo !== pageNo) {
      onChange(changeNo);
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.prevButton}
        disabled={pageNo === 1 || totalCount < countPerPage}
        onClick={() => onChange(pageNo - 1)}
      >
        <img src="/image/ico/ico-page-prev.svg" />
      </button>
      {pages.map((item: IPage, index: number) =>
        item.isSkip ? (
          <button type="button" key={`skip_${index}`} className={styles.textButton}>
            ...
          </button>
        ) : (
          <button
            className={clsx(styles.textButton, { [styles.selected]: item.isSelected })}
            type="button"
            key={`page_${index}`}
            onClick={() => handleClick(item.pageNo)}
          >
            {item.pageNo}
          </button>
        ),
      )}
      <button
        className={styles.nextButton}
        disabled={pageNo === totalPages || totalCount < countPerPage}
        onClick={() => onChange(pageNo + 1)}
      >
        <img src="/image/ico/ico-page-next.svg" />
      </button>
    </div>
  );
}
