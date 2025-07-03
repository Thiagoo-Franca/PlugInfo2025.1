'use client'
import styles from './Contact.module.css'
import { useForm, SubmitHandler, Form } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const validationSchema = Yup.object({
    nome: Yup.string().required("Nome é obrigatório!"),
    email: Yup.string().email("Email invalido").required("Email é obrigatorio"),
    mensagem: Yup.string().required("Mensagem necessaria!")

})

export default function Contact() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    })

    const onSubmit = async (data: any) => {
        try {
            const res = await fetch("/api/clientes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!res.ok) throw new Error("Erro ao enviar mensagem");

            toast.success("Mensagem enviada com sucesso");
        } catch (err) {
            console.error("Erro ao enviar mensagem", err);
            toast.error("Erro ao enviar mensagem! ")
        }
    }

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

            <form className={styles.formulario} onSubmit={handleSubmit(onSubmit)} >
                <hr />
                <h1>Fale conosco</h1>
                <div style={{ position: 'relative' }}>

                    <input {...register("nome")} type="text" name="nome" className={styles.nomeEmail} placeholder='Nome' />
                    {errors.nome?.message && <p className={styles.errors}>{errors.nome?.message}</p>}
                </div>


                <div style={{ position: 'relative' }}>
                    <input {...register("email")} name='email' className={styles.nomeEmail} placeholder='Email' />
                    {errors.email?.message && <p className={styles.errors}>{errors.email?.message}</p>}

                </div>
                <div style={{ position: 'relative' }}>
                    <input {...register("mensagem")} type="text" name='mensagem' placeholder='Mensagem' className={styles.mensagem} />
                    {errors.mensagem?.message && <p className={styles.errors}>{errors.mensagem?.message}</p>}

                </div>

                <button type='submit'><h1>Enviar</h1></button>
            </form>
            <ToastContainer />

        </main>
    )
}