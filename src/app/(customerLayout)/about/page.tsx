"use client"

import { useEffect, useState } from 'react';
import BackToTopButton from "@/components/button/flatButton/backToTopButton";
import ImageCarousel from "@/components/carousel/imgCarousel/imgCarousel";
import CompanyIntro from "@/containers/aboutPage/companyIntro/companyIntro";
import ContactBanner from "@/containers/aboutPage/contactBanner/contactBanner";
import HeroSection from "@/containers/aboutPage/heroSection/heroSection";
import ScaleRange from "@/containers/aboutPage/scaleRange/scaleRange";
import ServiceProcess from "@/containers/aboutPage/serviceProcess/serviceProcess";
import StatsHighlight from "@/containers/aboutPage/statsHighlight/statsHighlight";
import { mockCarouselServices } from '@/services/fireBase/mockData';
import SocialButtons from '@/components/button/flatButton/socialButtons';
import { Image } from '@/services/fireBase/adminServices/type';
import { getImages } from '@/services/fireBase/adminServices/dbServices';

export default function About() {
    const [images, setImages] = useState<Image[]>([]);
    useEffect(() => {
        async function fetchImages() {
            const fetchedImages = await getImages();
            const guestImages = fetchedImages.filter(img => img.tagname === "#service");
            setImages(guestImages);
        }

        fetchImages();
    }, []);
    return (
        <div>
            <HeroSection />
            <CompanyIntro
                bgImgDark="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2lhb3Y4ZHEzdTZqZTcwMzYzY2Y5eW8zbzFlY3RjZXY2Y2sxdmptaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/c478pAcx4QpSmqXUxN/giphy.gif"
                bgImgLight="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2lhb3Y4ZHEzdTZqZTcwMzYzY2Y5eW8zbzFlY3RjZXY2Y2sxdmptaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/c478pAcx4QpSmqXUxN/giphy.gif"
            />
            <ImageCarousel
                images={images} slidesPerView={1}
                className="imgCarouselOneItem"
            />
            <ServiceProcess />
            <ScaleRange />
            <StatsHighlight />
            <ContactBanner />
            <SocialButtons />
            <BackToTopButton />
        </div>
    );
}
