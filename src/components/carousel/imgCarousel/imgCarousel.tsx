"use client";

import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import clsx from "clsx";
import { Image } from '@/services/fireBase/adminServices/type';
import styles from './imgCarousel.module.css';

interface CarouselProps {
    images: Image[];
    slidesPerView: number;
    className?: string;
}

export default function ImageCarousel({ images, slidesPerView, className }: CarouselProps) {
    const swiperRef = useRef<any>(null);

    const getBreakpoints = (slidesPerView: number) => {
        if (slidesPerView === 5) {
            return {
                0: { slidesPerView: 1 },
                600: { slidesPerView: 2 },
                1025: { slidesPerView: 5 },
            };
        } else {
            return {
                0: { slidesPerView: 1 },
                600: { slidesPerView: 1 },
                1025: { slidesPerView: 1 },
            };
        }
    };

    useEffect(() => {
        if (swiperRef.current && images.length > 0) {
            swiperRef.current.navigation.init();
            swiperRef.current.navigation.update();
            swiperRef.current.autoplay.start();
        }
    }, [images]);


    return (
        <div className={styles.carouselContainer}>
            {images.length > 0 && (
                <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    modules={[Navigation, Autoplay]}
                    slidesPerView={slidesPerView}
                    spaceBetween={20}
                    loop={true}
                    navigation
                    breakpoints={getBreakpoints(slidesPerView)}
                    autoplay={{ delay: 5000 }}
                    className={styles.swiper}
                >
                    {images.map((img) => (
                        <SwiperSlide key={img.id}>
                            <div className={clsx(styles.imageCard, className)}>
                                <img src={img.file} alt={img.tagname} className={styles.image} />
                                <div className={styles.caption}>
                                    <h3>{img.title}</h3>
                                    <p>{img.description}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
}
