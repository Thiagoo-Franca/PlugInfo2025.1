import Copyright from './Copyright';
import styles from './Footer.module.css'

export default function Footer() {
    return (
        <>
            <div className={styles.Footer}>
                <Copyright />
            </div>
        </>
    );
}