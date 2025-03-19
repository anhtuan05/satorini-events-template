"use client"

import ImageCarousel from "@/components/carousel/imgCarousel/imgCarousel";
import { Image } from '@/services/fireBase/adminServices/type';
import { useEffect, useState } from 'react';
import { getImages } from "@/services/fireBase/adminServices/dbServices";

export default function Guest() {
    const [images, setImages] = useState<Image[]>([]);
    useEffect(() => {
        async function fetchImages() {
            const fetchedImages = await getImages();
            const guestImages = fetchedImages.filter(img => img.tagname === "#guest");
            setImages(guestImages);
        }

        fetchImages();
    }, []);
    return (
        <>
            <ImageCarousel images={images} slidesPerView={5} />
        </>
    );
}
