import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import Configuration from '../config';

const {
    nodemailer: { nodemailer_password, nodemailer_user },
} = Configuration;

const sendEmail = async (emailObject : Record<string,any>): Promise<void> => {

    const { to, html, subject } = emailObject;
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: nodemailer_user,
                pass: nodemailer_password,
            },
        } as SMTPTransport.Options);

        // Define the email message
        const message = {
            from: nodemailer_user,
            to,
            subject: subject,
            text: " ",
            html: html,
        };

        const info = await transporter.sendMail(message);

        console.log(`Email sent successfully! Message ID: ${info.messageId}`);
    } catch (error: unknown) {
        console.error(`Error sending email: ${(error as Error).message}`);
        throw new Error('Email could not be sent');
    }
};

export default sendEmail;
