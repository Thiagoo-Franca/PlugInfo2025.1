'use client'

import { use, useEffect, useState } from 'react'
import styles from './MainCarrinho.module.css'
import { Pizza } from '../../../../../components/Menu/Menu';
import Link from 'next/link';

type PizzaComQuantidade = Pizza & { quantidade: number };


export default function MainCarrinho() {

    const [opcaoEntrega, setOpcaoEntrega] = useState<'entrega' | 'retirada' | null>(null);


    const [carrinho, setCarrinho] = useState<PizzaComQuantidade[]>([])

    function precoNumber(precoString: string): number {
        return parseFloat
            (
                precoString
                    .replace("R$", "")   // tira "R$"
                    .trim()             // tira espaços
                    .replace(".", "")    // tira pontos de milhares, se houver
                    .replace(",", ".")   // troca vírgula decimal por ponto
            )
    };

    const subtotal = carrinho.reduce(
        (acc, item) => acc + precoNumber(item.preco) * item.quantidade,
        0
    );
    const taxaEntrega = 8.90
    const taxaAplicada = opcaoEntrega === 'entrega' ? taxaEntrega : 0;
    const total = subtotal + taxaAplicada;

    useEffect(() => {

        async function getData() {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/carrinho`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const json: Pizza[] = await response.json()

                const agrupado: { [id: string]: PizzaComQuantidade } = {};
                json.forEach((pizza) => {
                    if (agrupado[pizza.id]) {
                        agrupado[pizza.id].quantidade += 1;
                    } else {
                        agrupado[pizza.id] = { ...pizza, quantidade: 1 };
                    }
                });


                setCarrinho(Object.values(agrupado));
                console.log(agrupado)
                console.log(json);
            } catch (error) {
                console.log("erro", error);
            }
        }

        getData();
    }, [])

    const handleSubimitAdd = async (pizza: Pizza) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carrinho`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pizza)
            });
            if (!res.ok) throw new Error("Erro ao adicionar pizza no carrinho");

            setCarrinho((prev) => {
                const jaExiste = prev.find((p) => p.id === pizza.id);
                if (jaExiste) {
                    return prev.map((p) =>
                        p.id === pizza.id
                            ? { ...p, quantidade: p.quantidade + 1 }
                            : p
                    );
                } else {
                    return [...prev, { ...pizza, quantidade: 1 }];
                }
            });


            console.log("Pizza adicionada:", pizza);

        } catch (err) {
            console.error("Erro ao adicionar ao carrinho:", err);
        }
        console.log("Adicionando pizza", pizza)
    }

    const handleSubimitDel = async (pizza: Pizza) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carrinho/${pizza.id}`, {
                method: 'DELETE',


            });
            if (!res.ok) throw new Error("Erro ao remover pizza no carrinho");


            const deletePizza = await res.json();

            setCarrinho((prev) =>
                prev
                    .map((p) =>
                        p.id === pizza.id
                            ? { ...p, quantidade: p.quantidade - 1 }
                            : p
                    )
                    .filter((p) => p.quantidade > 0)
            );

            console.log("Pizza removida:", deletePizza);

        } catch (err) {
            console.error("Erro ao remover ao carrinho:", err);
        }
    }

    const handleSubimitClear = async () => {
        try {
            for (const pizza of carrinho) {
                for (let i = 0; i < pizza.quantidade; i++) {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carrinho/${pizza.id}`, {
                        method: 'DELETE',
                    });
                    if (!res.ok) throw new Error("Erro ao remover pizza " + pizza.id);
                }
            }
            setCarrinho([]);
        } catch (err) {
            console.error("Erro ao limpar carrinho:", err);
        }
    };


    return (

        <main className={styles.MainCarrinho}>

            <div className={styles.Heading}>
                <h1>Seu Carrinho</h1>
            </div>

            <section>

                <div className={styles.Container}>

                    {carrinho.map((item, index) => (
                        <div key={`${item.id} - ${index}`} className={styles.ItemWrapper}>
                            <img className={styles.imgAolado} src={item.imagem} alt={item.nome} />
                            <div className={styles.Informacoes}>
                                <div className={styles.NomePreco}>
                                    <h2>{item.nome}</h2>
                                    <p>Pizza tradicional com pepperoni e queijo mozzarella</p>
                                    <h3>{item.preco}</h3>
                                </div>
                            </div>
                            <div className={styles.Quantidade}>
                                <img onClick={() => handleSubimitDel(item)} src="/assets/MainCarrinho/Button (1).png" alt="" />
                                <p> {item.quantidade} </p>
                                <img onClick={() => handleSubimitAdd(item)} src="/assets/MainCarrinho/Button.png" alt="" />
                            </div>

                        </div>
                    ))}
                    <button className={styles.botaoLimparCarrinho} onClick={() => handleSubimitClear()} type="submit">
                        Limpar Carrinho
                    </button>
                </div>

                <div className={styles.resumo}>
                    <h1 className={styles.Heading2}>Resumo do Pedido</h1>

                    <div className={styles.HorizontalBorder}>
                        <h2>Subtotal</h2>
                        <h2>{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
                    </div>

                    <div className={styles.entrega}>
                        <h3 className={styles.entregaH3}>Entrega</h3>

                        <div className={styles.marcar}>
                            <input
                                type="radio"
                                id="entrega"
                                name="opcao-entrega"
                                checked={opcaoEntrega === 'entrega'}
                                onChange={() => setOpcaoEntrega('entrega')}

                            />
                            <label htmlFor="entrega">{taxaEntrega.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</label>
                        </div>

                        <div className={styles.marcar}>
                            <input
                                type="radio"
                                id="retirada"
                                name="opcao-entrega"
                                checked={opcaoEntrega === 'retirada'}
                                onChange={() => setOpcaoEntrega('retirada')}
                            />
                            <label htmlFor="retirada">Retirada (Grátis)</label>
                        </div>
                    </div>

                    <div className={styles.HorizontalBorder}>
                        <h2>Taxa de entrega</h2>
                        <h2>{taxaEntrega.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
                    </div>

                    <div className={styles.HorizontalBorder}>
                        <h2>Total</h2>
                        <h2>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
                    </div>

                    <Link href='/'>
                        <button type="submit">
                            <h2>Finalizar Pedido</h2>
                        </button>
                    </Link>
                </div>
            </section>
        </main>
    );
}