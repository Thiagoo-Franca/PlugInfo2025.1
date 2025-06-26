import Link from 'next/link'
import Logo from '../Logo/Logo'
import styles from './Header.module.css'

export default function Header() {
    return (
        <header className={styles.Header}>
            <section>
                <div></div>
                <Link href='/'>
                    <Logo />
                </Link>
                <Link href='/carrinho'>
                    <img src="/assets/Header/cart.png" alt="" />

                </Link>
            </section>
        </header>
    )
}