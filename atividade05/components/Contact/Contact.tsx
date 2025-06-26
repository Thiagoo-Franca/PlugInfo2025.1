'use client'
import { useFormik } from 'formik'
import styles from './Contact.module.css'
import * as Yup from 'yup'

const validationSchema = Yup.object({
    nome: Yup.string().required("Nome é obrigatório!"),
    email: Yup.string().email("Email invalido").required("Email é obrigatorio")
})

export default function Contact() {

    const formik = useFormik ({
        initialValues : {nome: "", email: "", mensagem: ""}, 
        validationSchema,
        onSubmit: (values) => {
            console.log(values)
        
        },
    });

    return (
        <main className={styles.Contact}>

            <section className={styles.ScheduleInfo}>

                <article className={styles.Schedule}>
                    <img src="/assets/ContactImg/Clock.png" alt="" />
                    <div>
                        <h1>SEG - QUI 10:00 - 23:00</h1>
                        <h1>SEX - DOM 18:00 - 23:00</h1>
                    </div>
                </article>

                <article className={styles.Info}>
                    <div className={styles.Location}>
                        <img src="/assets/ContactImg/Location pin.png" alt="" />
                        <h1>Rua Flores Cordovil, 106</h1>
                    </div>

                    <div className={styles.Phone}>
                        <img src="/assets/ContactImg/WhatsApp.png" alt="" />
                        <h1>(95) 99460-9947</h1>
                    </div>
                </article>

            </section>

            <form className={styles.formulario} onSubmit={formik.handleSubmit}>
                <hr />
                <h1>Fale conosco</h1>
                <input value={formik.values.nome} onChange={formik.handleChange} type="text" name="nome" className={styles.nomeEmail} placeholder='Nome' />
                {formik.errors.nome && <p className={styles.errors}>{formik.errors.nome}</p>}
                <input value={formik.values.email} onChange={formik.handleChange} type="email" name='email' className={styles.nomeEmail} placeholder='Email' />
                {formik.errors.email && <p className={styles.errors}>{formik.errors.email}</p>}
                <input value={formik.values.mensagem} onChange={formik.handleChange} type="text" name='mensagem' placeholder='Mensagem' className={styles.mensagem} />
                <button type="submit"><h1>Enviar</h1></button>
            </form>

        </main>
    )
}