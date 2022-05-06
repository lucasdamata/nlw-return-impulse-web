import nodemailer from 'nodemailer'
import { MailAdapter, SendEmailData } from "../mailAdapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "7409c6a7d8e389",
    pass: "9273f79f8efc9e"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendEmailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Lucas da Mata <hefesttecnologia@gmail.com>',
      subject,
      html: body
    })
  };
}