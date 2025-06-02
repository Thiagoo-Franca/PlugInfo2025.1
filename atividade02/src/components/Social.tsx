import LogoGrande from './LogoGrande';
import styles from './Social.module.css'


export default function Social() {
    return(
        <div className={styles.Social}>
            <LogoGrande />
            <div className={styles.RedesSociaisLogo}>
                <img src="/assets/Logos/Instagram.png" alt="Instagram" />
                <img src="/assets/Logos/Facebook.png" alt="Facebook" />
            </div>
        </div>
    );
}