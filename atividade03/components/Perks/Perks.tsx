import styles from './Perks.module.css'

export default function Perks() {

    return (
        <>
            <main className={styles.Perks}>
                <section>
                    <img src="/assets/PerksImg/tabler_chef-hat.png" alt="" />
                    <h1>Criada pro chefs</h1>
                    <p>O menu foi elaborado pelos Chefs reconhecidos: Chef 01 e Chef 02.</p>
                </section>
                <section>
                    <img src="/assets/PerksImg/fluent_bowl-salad-24-regular.png" alt="" />
                    <h1>Qualidade dos ingredientes</h1>
                    <p>Utilizamos os melhores ingredientes
                        com qualidade e marca já reconhecida
                        no mercado.</p>
                </section>
                <section>
                    <img src="/assets/PerksImg/ic_baseline-delivery-dining.png" alt="" />
                    <h1>Velocidade na entrega</h1>
                    <p>O processo de fabricação da pizza é extremamente rápido, possibilitando uma entrega com agilidade.</p>
                </section>
            </main>
        </>
    );
}