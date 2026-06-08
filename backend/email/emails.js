// All outgoing emails, sent via the Brevo transactional email HTTP API (port 443),
// which works on hosts (like Render) that block outbound SMTP.
import { BREVO_API_URL, BREVO_API_KEY, sender } from "./email.config.js";
import {
    VERIFICATION_EMAIL_TEMPLATE,
    WELCOME_EMAIL_TEMPLATE,
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";

// Low-level helper: POST one email to Brevo and throw on a non-OK response.
const sendEmail = async ({ to, subject, html }) => {
    if (!BREVO_API_KEY || !sender.email) {
        throw new Error("Email not configured: set BREVO_API_KEY and SENDER_EMAIL.");
    }

    const response = await fetch(BREVO_API_URL, {
        method: "POST",
        headers: {
            "api-key": BREVO_API_KEY,
            "Content-Type": "application/json",
            accept: "application/json",
        },
        body: JSON.stringify({
            sender,
            to: [{ email: to }],
            subject,
            htmlContent: html,
        }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Brevo API ${response.status}: ${errorBody}`);
    }
};

export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        await sendEmail({
            to: email,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
        });
        console.log("Verification email sent to", email);
    } catch (error) {
        console.error("Error sending verification email", error);
        throw new Error(`Error sending verification email: ${error.message}`);
    }
};

export const sendWelcomeEmail = async (email, name) => {
    try {
        await sendEmail({
            to: email,
            subject: "Welcome to Secure Auth",
            html: WELCOME_EMAIL_TEMPLATE.replaceAll("{name}", name),
        });
        console.log("Welcome email sent to", email);
    } catch (error) {
        console.error("Error sending welcome email", error);
        throw new Error(`Error sending welcome email: ${error.message}`);
    }
};

export const sendForgotPasswordEmail = async (email, resetURL) => {
    try {
        await sendEmail({
            to: email,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
        });
        console.log("Password reset email sent to", email);
    } catch (error) {
        console.error("Error sending forgot password email", error);
        throw new Error(`Error sending forgot password email: ${error.message}`);
    }
};

export const sendResetSuccessEmail = async (email) => {
    try {
        await sendEmail({
            to: email,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        });
        console.log("Password reset success email sent to", email);
    } catch (error) {
        console.error("Error sending reset success email", error);
        throw new Error(`Error sending reset success email: ${error.message}`);
    }
};
