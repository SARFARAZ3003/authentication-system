//here we will have all our emails.

import { VERIFICATION_EMAIL_TEMPLATE , PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE} from "./emailTemplates.js";
import { mailTrapClient, sender } from "./mailtrap.config.js";


export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}]

    try{
        const response =await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            // text: `Your verification code is: ${verificationToken}`,
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        });

        console.log("Email sent successfully",response)
    }
    catch(error)
    {
        console.error("Bhai mere Error sending verification email", error)      //toh ye toh dikhayega vo apne terminal m dikhayega bas aur kuch nhi . program flow pe koi effect nahi

        throw new Error(`Error sending verification email: ${error.message}`)   //aur ye jo hai proper error bhejega jisse isko jo call kiya hai, auth.controller , 
                                                                                //ki hum jo sendverification email jo call kiye usme error throw hua then vo phir bolega error and apne catch m chala jayega ye error leke.

    }
};

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{email}]

    try {
        
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "2a2f21c4-7757-4d30-907a-0e11070684b3",
            template_variables: {
                "company_info_name": "Auth Company",
                "name": name,
            }
        })

        console.log("Welcome email sent successfully", response);
    } catch (error) {
        console.error("Error sending welcome email", error);
        throw new Error(`Error sending welcome email: ${error.message}`)
        
    }
};

export const sendForgotPasswordEmail = async (email, resetURL) => {
    const recipient = [{email}];

    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset",
        });

    } catch (error) {
        console.log("Error sending forgot password email", error);
        throw new Error(`Error sending forgot password email: ${error.message}`);
    }


};

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{email}];

    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Successfully Reset Password"
        });

        console.log("Password reset email sent successfully.",response);
    } catch (error) {
        console.log("Error sending reset password success email",error);
        throw new Error(`Error sending reset password success email: ${error.message}`);
    }
};