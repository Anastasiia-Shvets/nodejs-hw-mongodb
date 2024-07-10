import nodemailer from 'nodemailer';
import { SMTP } from '../contacts/index.js';
import { env } from './env.js';

const transporter = nodemailer.createTransport({
  host: env(SMTP.SMTP_HOST),
  port: Number(env(SMTP.SMTP_PORT)),
  auth: {
    user: env(SMTP.SMTP_USER),
    pass: env(SMTP.SMTP_PASS),
  },
});

export const sendEmail = async (options) => {
    await transporter.sendMail(options);

};
