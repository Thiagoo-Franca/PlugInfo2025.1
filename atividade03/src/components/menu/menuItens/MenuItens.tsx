'use client';

import styles from './MenuItens.module.css';
import React, { useEffect, useState, useContext } from "react";
import Slider from "react-slick";
import { CarrinhoContext } from "@/app/carrinho/components/CarrinhoContext";
import { Pizza } from "@/app/carrinho/components/Main";
import Post from "./post/Post";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MenuItens() {
    const carrinhoContext = useContext(CarrinhoContext);

    if (!carrinhoContext) {
        throw new Error("CarrinhoContext is undefined.");
    }

    const [pizzas, setPizzas] = useState<Pizza[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/cardapio")
            .then((res) => res.json())
            .then((data) => {
                console.log("Pizzas recebidas:", data); // 👈 Verificar dados
                setPizzas(data);
            });
    }, []);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1, responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: 4,
                },
            }
        ]
    };

    return (
        <div className={styles.sliderWrapper}>
            <Slider {...settings}>
                {pizzas.map((pizza) => (
                    <div key={pizza.id} className={styles.slide}>
                        <Post pizza={pizza} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}
