import nodemailer from 'nodemailer';
import { SMTP } from '../contacts/index.js';
import checkEnvFor from './env.js';

const transport = nodemailer.createTransport({
  host: checkEnvFor(SMTP.SMTP_HOST),
  port: checkEnvFor(SMTP.SMTP_PORT),
  auth: {
    user: checkEnvFor(SMTP.SMTP_USER),
    pass: checkEnvFor(SMTP.SMTP_PASS),
  },
});

export const sendEmail = async (options) => {
    return await transport.sendMail(options);
};
