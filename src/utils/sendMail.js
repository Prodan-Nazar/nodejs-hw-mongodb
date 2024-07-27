import nodemailer from 'nodemailer';
import 'dotenv/config';

import { SMTP } from '../constants/index.js';
import { env } from '../utils/env.js';
import createHttpError from 'http-errors';

const transporter = nodemailer.createTransport({
  host: env(SMTP.SMTP_HOST),
  port: Number(env(SMTP.SMTP_PORT)),
  auth: {
    user: env(SMTP.SMTP_USER),
    pass: env(SMTP.SMTP_PASSWORD),
  },
});

export const sendEmail = async (options) => {
  try {
    const send = await transporter.sendMail(options);
    return send;
  } catch (error) {
    throw createHttpError(500, 'Failed to send email', error);
  }
};
