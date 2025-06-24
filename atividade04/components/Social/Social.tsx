import styles from './Social.module.css'

export default function Social() {

    return(
        <main className={styles.Social}>
            <h1>PIZZA<span style={{ color: '#FFAF14' }}>PIZZA</span></h1>
            <section>
                <img src="/assets/Social/Instagram.png" alt="" />
                <img src="/assets/Social/Facebook.png" alt="" />
            </section>
        </main>
    );
}