import dotenv from "dotenv";

dotenv.config();

// Brevo (transactional email) sends over HTTPS, so it works on hosts like Render
// that block outbound SMTP. Get an API key at https://app.brevo.com (SMTP & API → API Keys)
// and verify a sender email at Senders, Domains & Dedicated IPs → Senders.
export const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
export const BREVO_API_KEY = process.env.BREVO_API_KEY;

// The "from" address. SENDER_EMAIL must be a VERIFIED sender in your Brevo account.
export const sender = {
    name: process.env.SENDER_NAME || "Secure Auth",
    email: process.env.SENDER_EMAIL,
};
