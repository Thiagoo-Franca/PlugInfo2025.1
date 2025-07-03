import { NextResponse } from 'next/server'

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function POST(req: Request) {
    try {
        const { nome, email, mensagem } = await req.json()

        console.log(nome, email)
        const msg = {
            to: `${email}`,
            from: 'francathiago450@gmail.com',
            subject: `Nova mensagem de ${nome}`,
            html: `<p><strong>De:</strong> ${email}</p><p>${mensagem}</p>`
        }

        console.log('funcionou')
        console.log(msg)
        await sgMail.send(msg)

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error('Erro ao enviar mensagem', err)
        return NextResponse.json({ success: false, error: 'Erro ao enviar mensagem' })
    }
}
