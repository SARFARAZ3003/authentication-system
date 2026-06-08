import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Gmail SMTP transport. Uses an App Password (NOT your normal Gmail password) —
// generate one at https://myaccount.google.com/apppasswords (requires 2FA enabled).
// Explicit host/port + timeouts so that if the host blocks SMTP, we fail fast
// (a few seconds) instead of hanging the request forever.
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,          // your full gmail address
        pass: process.env.GMAIL_APP_PASSWORD,  // 16-char app password (no spaces)
    },
    connectionTimeout: 10000,  // 10s to establish TCP connection
    greetingTimeout: 10000,    // 10s to receive SMTP greeting
    socketTimeout: 15000,      // 15s of inactivity
});

// Friendly "from" name shown to recipients.
export const sender = `"Secure Auth" <${process.env.GMAIL_USER}>`;
