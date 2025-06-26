import styles from './Hero.module.css'
import { Metadata } from 'next';
import { createClient } from '@/prismicio';
import { asText } from '@prismicio/helpers';
 
export default async function Hero() {
    const client = createClient();
    const page = await client.getSingle("hero");

    return (
        <>
            <main className={styles.Hero}>
                <section className={styles.HeroDescricao}>
                    <h1>{asText(page.data.titulo) || "Melhor pizzaria da cidade"}</h1>
                    <p> Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                        Velit officia consequat duis enim velit mollit. Exercitation veniam
                        consequat sunt nostrud amet.</p>
                    <button type="submit"><h5>Peça Online</h5></button>
                </section>
                <img src={page.data.heroimage.url || "/public/assets/HeroImg/Pizza.png"} alt="pizzaIMG" />
            </main>

        </>
    );
}