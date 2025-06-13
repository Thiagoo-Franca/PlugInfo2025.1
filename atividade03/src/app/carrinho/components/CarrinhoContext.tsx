'use client';

import { createContext, useState, ReactNode } from "react";
import { Pizza } from "./Main";

export type ItemCarrinho = Pizza & { quantidade: number };



type CarrinhoContextType = {
    carrinho: ItemCarrinho[];
    adicionarPizza: (pizza: Pizza) => void;
    aumentarQuantidade: (id: number) => void;
    diminuirQuantidade: (id: number) => void;
    limparCarrinho: () => void;
};

export const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
    const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
    const limparCarrinho = () => setCarrinho([]);


    const adicionarPizza = (pizza: Pizza) => {
        setCarrinho((prevCarrinho) => {
            const index = prevCarrinho.findIndex(item => item.id === pizza.id);

            // Se já existe, incrementa a quantidade
            if (index !== -1) {
                const novoCarrinho = [...prevCarrinho];
                novoCarrinho[index].quantidade += 1;
                return novoCarrinho;
            }

            // Senão, adiciona a pizza com quantidade 1
            return [...prevCarrinho, { ...pizza, quantidade: 1 }];
        });
    };

    const aumentarQuantidade = (id: number) => {
        setCarrinho(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
            )
        );
    };

    const diminuirQuantidade = (id: number) => {
        setCarrinho(prev =>
            prev
                .map(item =>
                    item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item
                )
                .filter(item => item.quantidade > 0) // remove se quantidade chegar a 0
        );
    };

    return (
        <CarrinhoContext.Provider value={{ carrinho, adicionarPizza, aumentarQuantidade, diminuirQuantidade, limparCarrinho }}>
            {children}
        </CarrinhoContext.Provider>
    );
}
