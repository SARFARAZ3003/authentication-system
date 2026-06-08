// One-off check that Gmail SMTP credentials work.
// Run from project root:  node backend/scripts/testEmail.js
import { transporter, sender } from "../email/email.config.js";
import dotenv from "dotenv";

dotenv.config();

const run = async () => {
    console.log("Verifying SMTP connection...");
    await transporter.verify();
    console.log("SMTP connection OK. Sending test email to", process.env.GMAIL_USER);

    const info = await transporter.sendMail({
        from: sender,
        to: process.env.GMAIL_USER,
        subject: "Secure Auth — test email",
        html: "<h2>It works!</h2><p>Your Gmail SMTP setup is sending emails correctly.</p>",
    });

    console.log("Sent. Message id:", info.messageId);
    process.exit(0);
};

run().catch((err) => {
    console.error("FAILED:", err.message);
    process.exit(1);
});
