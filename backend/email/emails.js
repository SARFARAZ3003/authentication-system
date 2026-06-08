// All outgoing emails, sent via Gmail SMTP (nodemailer).
import { transporter, sender } from "./email.config.js";
import {
    VERIFICATION_EMAIL_TEMPLATE,
    WELCOME_EMAIL_TEMPLATE,
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        await transporter.sendMail({
            from: sender,
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
        await transporter.sendMail({
            from: sender,
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
        await transporter.sendMail({
            from: sender,
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
        await transporter.sendMail({
            from: sender,
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
