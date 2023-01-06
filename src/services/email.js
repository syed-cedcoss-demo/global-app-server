import chalk from "chalk";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { forget, signup } from "../templates/email.js";
dotenv.config();

let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  },
});

export const registrationMail = async (data) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_ID,
      to: data?.email,
      subject: "Account Confirmation Mail",
      text: "Account Confirmation Mail",
      html: signup(data),
    });
    console.log(chalk.bgYellowBright.bold("sent email id:", info.messageId));
  } catch (error) {
    console.log(chalk.bgRed.bold(error));
  }
};

export const forgetPassEmail = async (data) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_ID,
      to: data?.email,
      subject: "Password Reset Mail",
      text: "Password Reset Mail",
      html: forget(data),
    });
    console.log(chalk.bgYellowBright.bold("sent email id:", info.messageId));
  } catch (error) {
    console.log(chalk.bgRed.bold(error));
  }
};
