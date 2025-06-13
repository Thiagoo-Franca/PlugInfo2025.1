import styles from './Header.module.css'
import Logo from './Logo';
import Link from 'next/link';


export default function Header() {
    return (
        <>
            <div className={styles.header}>
                <Logo />
                <div>
                    <Link href='/carrinho'>
                        <button className={styles.carrinho}><h1>Carrinho</h1></button>
                    </Link>
                </div>
            </div>
        </>
    );
}