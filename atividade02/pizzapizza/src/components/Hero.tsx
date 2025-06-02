import styles from './Hero.module.css'

export default function Hero() {
    return (
        <>
            <div className={styles.Hero}>
                <div className={styles.Content}>
                    <h1>Melhor pizzaria da cidade</h1>
                    <p>Amet minim mollit non deserunt 
                        ullamco est sit aliqua dolor
                         do amet sint. Velit officia 
                         consequat duis enim velit mollit. 
                         Exercitation veniam consequat 
                         sunt nostrud amet.</p>
                    <button><h2>Peça Online</h2></button>
                </div>
                <img className={styles.Pizza} src="/assets/Hero/Pizza.png" alt="Pizza" />
            </div>
        </>
    );
}