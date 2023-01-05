import chalk from "chalk";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { signup } from "../templates/email.js";
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

export const adsMail = async (data) => {
  try {
    console.log("data", data);
    const info = await transporter.sendMail({
      from: process.env.EMAIL_ID,
      to: data?.email,
      subject: "Diwali Offers",
      text: "Diwali offers",
      html: "html template",
    });
    console.log(chalk.bgYellowBright.bold("sent email id:", info.messageId));
  } catch (error) {
    console.log(chalk.bgRed.bold(error));
  }
};
