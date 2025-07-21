import React, { useEffect } from 'react';
import styles from './index.module.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import 'rsuite/dist/rsuite.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { ReviewItem } from '@/components/common';
import 'swiper/css';
import 'swiper/css/pagination';
import { fetchNotice, fetchReview } from '@/feature/home/controller';
import { useReviewStore } from '@/feature/home/store';

interface InputProps {
  cate?: string;
  title?: string;
  desc?: string;
}

export default function index({ cate, title, desc }: InputProps) {
  const reviews = useReviewStore((state) => state.Reviews);
  useEffect(() => {
    fetchReview();
    // fetchCompletes().then((result) => {
    //   //setData(result);
    //   console.log(result);
    // });
  }, []);
  return (
    <div className={styles.homeReviews}>
      <div className={styles.rela}>
        {cate && <div className={styles.cate}>{cate}</div>}
        <div className={styles.title}>{title}</div>
        <div className={styles.desc}>{desc}</div>

        <div className={styles.reviewSwiper}>
          <Swiper
            slidesPerView={'auto'}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            spaceBetween={40}
            breakpoints={{
              320: {
                spaceBetween: 20,
              },
              768: {
                spaceBetween: 40,
              },
            }}
          >
            {reviews.map((item) => (
              <SwiperSlide>
                <ReviewItem
                  title={item.title}
                  desc={item.description}
                  image={item.image}
                  name={item.name}
                  car={item.car}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
