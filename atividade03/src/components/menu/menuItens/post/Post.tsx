"use client";

import { useContext } from "react";
import { CarrinhoContext } from "../../../../app/carrinho/components/CarrinhoContext";
import styles from "./Post.module.css";
import { Pizza } from "@/app/carrinho/components/Main";

type PostProps = {
    pizza: Pizza;
};

export default function Post({ pizza }: PostProps) {
    const carrinhoContext = useContext(CarrinhoContext);

    if (!carrinhoContext) {
        throw new Error("CarrinhoContext is undefined. Ensure the provider is correctly set.");
    }

    const { adicionarPizza } = carrinhoContext;

    return (
        <div className={styles.postPizza}>
            <img src={`http://localhost:3000${pizza.imagem}`} alt={pizza.nome} />
            <h1>{pizza.nome}</h1>
            <p>{pizza.descricao}</p>
            <h2>{pizza.preco}</h2>
            <button type="button" onClick={() => adicionarPizza(pizza)}>
                <h1>Pedir agora</h1>
            </button>
        </div>
    );
}
