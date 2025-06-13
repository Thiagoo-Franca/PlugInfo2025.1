import styles from './Menu.module.css'
import MenuItens from './menuItens/MenuItens'


export default function Menu() {

    return (
        <>
            <div className={styles.menu}>

                <section className={styles.SectionTitle}>
                    <hr className={styles.Line1} />
                    <h1 className={styles.Title}>Nosso cardápio</h1>
                </section>

                <MenuItens />

            </div>

        </>
    )
}