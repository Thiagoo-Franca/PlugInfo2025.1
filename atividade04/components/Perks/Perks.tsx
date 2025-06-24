import { createClient } from '@/prismicio';
import { PrismicRichText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';
import styles from './Perks.module.css';

export default async function Perks() {
    const client = createClient();
    const pagePerks = await client.getSingle("perks");

    const slice = pagePerks.data.slices.find(
        (slice) => slice.slice_type === "perks_informacoes"
    );


    console.log(slice);

    if (!slice) {
        return <p>Nenhum conteúdo encontrado.</p>;
    }

    return (
        <main className={styles.Perks}>

            {slice.primary.group.map((item, index) => (



                <section key={index} className={styles.PerksSection}>

                    <PrismicNextImage field={item.image} fallbackAlt="" />
                    <PrismicRichText field={item.title} />
                    <PrismicRichText field={item.description} />

                </section>
            ))}



        </main>
    );
}
