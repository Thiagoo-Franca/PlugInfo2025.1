import styles from './Hero.module.css'

export default function Hero() {
    return (
        <>
            <main className={styles.Hero}>
                <section className={styles.HeroDescricao}>
                    <h1>Melhor pizzaria da cidade</h1>
                    <p> Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                        Velit officia consequat duis enim velit mollit. Exercitation veniam
                        consequat sunt nostrud amet.</p>
                    <button type="submit"><h5>Peça Online</h5></button>
                </section>
                <img className={styles.HeroImg} src="/assets/HeroImg/Pizza.png" alt="pizzaImg" />
            </main>

        </>
    );
}