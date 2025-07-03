'use client'

import styles from './Reviews.module.css';
import { PrismicRichText } from '@prismicio/react';
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createClient } from '@/prismicio';

export default function Reviews() {
    const [citacoes, setCitacoes] = useState<{ texto: any; autor: any }[]>([]);

    useEffect(() => {
        async function fetchData() {
            const client = createClient();
            const pageReviews = await client.getSingle("reviews");
            const slice = pageReviews.data.slices.find(
                (slice: any) => slice.slice_type === "citacoes_group"
            );
            if (slice?.primary?.citacoes) {
                setCitacoes(slice.primary.citacoes);
            }
        }

        fetchData();
    }, []);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <main className={styles.Reviews}>


            <img src="/assets/ReviewsImg/Format quote.png" alt="" />

            <Slider {...settings}>
                {citacoes.map((item, index) => (
                    <section key={index} className={styles.ReviewsSection}>
                        <PrismicRichText field={item.texto} />
                        <PrismicRichText field={item.autor} />
                    </section>
                ))}
            </Slider>

        </main>
    );
}
