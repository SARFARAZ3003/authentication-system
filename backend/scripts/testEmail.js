// One-off check that Brevo email credentials work.
// Run from project root:  node backend/scripts/testEmail.js
import dotenv from "dotenv";
import { sendVerificationEmail } from "../email/emails.js";

dotenv.config();

const run = async () => {
    const to = process.env.SENDER_EMAIL; // send a test to your own verified sender
    console.log("Sending test verification email to", to);
    await sendVerificationEmail(to, "123456");
    console.log("Sent successfully. Check that inbox (and spam).");
    process.exit(0);
};

run().catch((err) => {
    console.error("FAILED:", err.message);
    process.exit(1);
});
