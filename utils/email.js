import nodemailer from "nodemailer"


const sendEmail = async options => {

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const mailOptions = {
        from: "sara7a app <support@sara7a.com>",
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html: options.html
    }

    await transporter.sendMail(mailOptions)
}


export default sendEmail