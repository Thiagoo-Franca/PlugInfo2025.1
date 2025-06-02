import styles from './Perks.module.css'

export default function Perks() {
    return (
        <div className={styles.Perks}>
            <div className={styles.Chefs}>
                <img src="/assets/Perks/tabler_chef-hat.png" alt="" />
                <h2>Criada pro chefs</h2>
                <p>O menu foi elaborado pelos Chefs reconhecidos: Chef 01 e Chef 02.</p>
            </div>
            <div className={styles.Ingredients}>
                <img src="/assets/Perks/fluent_bowl-salad-24-regular.png" alt="" />
                <h2>Qualidade dos ingredientes</h2>
                <p>Utilizamos os melhores ingredientes
                    com qualidade e marca já reconhecida
                    no mercado.</p>
            </div>
            <div className={styles.Delivery}>
                <img src="/assets/Perks/ic_baseline-delivery-dining.png" alt="" />
                <h2>Velocidade na entrega</h2>
                <p>O processo de fabricação da pizza é extremamente rápido, possibilitando uma entrega com agilidade.</p>
            </div>
        </div>
    );
}