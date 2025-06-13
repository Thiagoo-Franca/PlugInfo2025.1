"use client";

import { useContext, useEffect, useState } from "react";
import { CarrinhoContext } from "./CarrinhoContext";
import styles from "./Main.module.css";
import { useRouter } from "next/router";
import Link from "next/link";



export type Pizza = {
    id: number;
    nome: string;
    descricao: string;
    preco: string;
    imagem: string;
};

function converterPreco(precoStr: string): number {
    return parseFloat(precoStr.replace("R$", "").replace(".", "").replace(",", ".").trim());
}

export default function Main() {

    const context = useContext(CarrinhoContext);

    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [entregaSelecionada, setEntregaSelecionada] = useState<"entrega" | "retirada">("retirada");
    const valorFrete = 8.9;

    if (!context) {
        throw new Error("CarrinhoContext is undefined. Ensure the provider is correctly set.");
    }

    const { carrinho, aumentarQuantidade, diminuirQuantidade, limparCarrinho } = context;

    // Atualiza subtotal ao mudar carrinho
    useEffect(() => {
        const subtotal = carrinho.reduce((acc, item) => {
            const precoNumerico = converterPreco(item.preco);
            return acc + precoNumerico * item.quantidade;
        }, 0);
        setSubTotal(subtotal);
    }, [carrinho]);

    // Atualiza total ao mudar subtotal ou tipo de entrega
    useEffect(() => {
        const frete = entregaSelecionada === "entrega" ? valorFrete : 0;
        setTotal(subTotal + frete);
    }, [subTotal, entregaSelecionada]);


    const finalizarPedido = () => {
        limparCarrinho();
        window.alert('Pedido concluido');

    };

    return (
        <main className={styles.carrinhoPage}>
            <div className={styles.Heading}>
                <h1>Seu Carrinho</h1>
            </div>
            <section>
                <div className={styles.Container}>
                    {carrinho.map((item) => (
                        <div key={item.id} className={styles.Informacoes}>
                            <img className={styles.imgAolado} src="/assets/PizzaImg/Pepperoni.png" alt="" />
                            <div>
                                <div className={styles.NomeDescPreco}>
                                    <h2>{item.nome}</h2>
                                    <p>Pizza tradicional com pepperoni e queijo mozzarella</p>
                                    <h3>{item.preco}</h3>
                                </div>
                            </div>
                            <div className={styles.quantidade}>
                                <img onClick={() => diminuirQuantidade(item.id)} src="/assets/botao/Button (1).png" alt="" />
                                <p>{item.quantidade}</p>
                                <img onClick={() => aumentarQuantidade(item.id)} src="/assets/botao/Button.png" alt="" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.resumo}>
                    <h1 className={styles.Heading2}>Resumo do Pedido</h1>

                    <div className={styles.HorizontalBorder}>
                        <h2>Subtotal</h2>
                        <h2>R$ {subTotal.toFixed(2)}</h2>
                    </div>

                    <div className={styles.entrega}>
                        <h3 className={styles.entregaH3}>Entrega</h3>

                        <div className={styles.marcar}>
                            <input
                                type="radio"
                                id="entrega"
                                name="opcao-entrega"
                                checked={entregaSelecionada === "entrega"}
                                onChange={() => setEntregaSelecionada("entrega")}
                            />
                            <label htmlFor="entrega">Entrega (R$ 8,90)</label>
                        </div>

                        <div className={styles.marcar}>
                            <input
                                type="radio"
                                id="retirada"
                                name="opcao-entrega"
                                checked={entregaSelecionada === "retirada"}
                                onChange={() => setEntregaSelecionada("retirada")}
                            />
                            <label htmlFor="retirada">Retirada (Grátis)</label>
                        </div>
                    </div>

                    <div className={styles.HorizontalBorder}>
                        <h2>Taxa de entrega</h2>
                        <h2>R$ {entregaSelecionada === "entrega" ? valorFrete.toFixed(2) : "0,00"}</h2>
                    </div>

                    <div className={styles.HorizontalBorder}>
                        <h2>Total</h2>
                        <h2>R$ {total.toFixed(2)}</h2>
                    </div>

                    <Link href='/'>

                        <button type="submit" onClick={finalizarPedido}>
                            <h2>Finalizar Pedido</h2>
                        </button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
