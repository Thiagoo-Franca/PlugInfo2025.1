'use client'

import styles from './Menu.module.css'

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from 'react';


export type Pizza = {
    id: number;
    nome: string;
    descricao: string;
    preco: string;
    imagem: string;
}

export type Carrinho = Pizza[]

export default function Menu() {

    const [pizzas, setPizzas] = useState<Pizza[]>([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/cardapio`)
            .then((res) => res.json())
            .then(data => setPizzas(data))
            .catch((error) => console.error("Erro ao buscar pizzas: ", error));
    }, []);

    const [carrinho, setCarrinho] = useState<Carrinho>([]);



    const handleSubmit = async (pizza: Pizza) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carrinho`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pizza)
            });

            if (!res.ok) throw new Error("Erro ao adicionar pizza no carrinho");

            const novoItem = await res.json();

            console.log("Pizza adicionada:", novoItem);
            setCarrinho((prev) => [...prev, novoItem]);
        } catch (err) {
            console.error("Erro ao adicionar ao carrinho:", err);
        }
        console.log("Adicionando pizza", pizza)
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: false,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    }
    return (
        <main className={styles.Menu}>
            <div className={styles.Titulo}>
                <hr />
                <h1>Nosso cardápio</h1>

            </div>
            <section className={styles.Carrossel}>
                <Slider {...settings}>
                    {pizzas.map((pizza) => (
                        <div key={pizza.id} className={styles.slide}>
                            <div className={styles.PostPizza}>
                                <img src={pizza.imagem} alt={pizza.nome} />
                                <h1>{pizza.nome}</h1>
                                <p>{pizza.descricao}</p>
                                <h2>{pizza.preco}</h2>
                                <button type='button' onClick={() => handleSubmit(pizza)}><h1>Pedir agora</h1></button>
                            </div>
                        </div>
                    ))}
                </Slider>
            </section>
        </main>
    )
}