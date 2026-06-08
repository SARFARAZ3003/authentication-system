import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Gmail SMTP transport. Uses an App Password (NOT your normal Gmail password) —
// generate one at https://myaccount.google.com/apppasswords (requires 2FA enabled).
export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,          // your full gmail address
        pass: process.env.GMAIL_APP_PASSWORD,  // 16-char app password (no spaces)
    },
});

// Friendly "from" name shown to recipients.
export const sender = `"Secure Auth" <${process.env.GMAIL_USER}>`;
