import styles from './Header.module.css'
import Link from 'next/link'

export default function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <Link href='/'>
                    <button> <h1>← Voltar ao cardápio</h1></button>
                </Link>

                <div className={styles.logo}>
                    <h1><span>PIZZA</span>PIZZA</h1>
                </div>
            </div>
        </div>
    )
}