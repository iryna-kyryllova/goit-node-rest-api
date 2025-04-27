import nodemailer from 'nodemailer'

const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env

const config = {
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD
  }
}

const transporter = nodemailer.createTransport(config)

/*
const data = {
  to: 'noresponse@gmail.com',
  subject: 'Nodemailer test',
  text: 'Привіт. Ми тестуємо надсилання листів!'
}
*/

const sendEmail = (data) => {
  const email = { ...data, from: `Iryna Kyryllova <${UKR_NET_EMAIL}>` }
  return transporter.sendMail(email)
}

export default sendEmail
