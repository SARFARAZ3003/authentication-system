import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../util/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail , sendForgotPasswordEmail, sendResetSuccessEmail} from "../email/emails.js";



export const signup = async (req, res) => {
    const {email, password, name} = req.body;       //now to able to extract them from req.body we need to add 


    try {
    if(!email || !password || !name)
    {
        throw new Error("All fields are required.");
    }

    // Basic strength check so weak passwords never reach the database.
    if(password.length < 6)
    {
        throw new Error("Password must be at least 6 characters long.");
    }

    const UserAlreadyExists = await User.findOne({email});      //{} is zaroori. findOne() expect krta h ek filter object. agr {} bina bhejnge toh lagega ki vairable hn.
    if(UserAlreadyExists){
        throw new Error("User already exists. ");
    }

    const hashedPassword = await bcryptjs.hash(password, 10);       //10 is salt here. It could be any number. Jitni zyada value, utna slow hashing, utni zyada security        10 = industry standard ✔️ ,12 = more secure but slower, 8  = fast but weaker

    const verificationToken = Math.floor(100000 + Math.random()*900000).toString();     //generate 6 digit code


    //DB me save karne ke liye ek user object prepare ho raha hai
    const user = new User({
        email,
        password: hashedPassword,
        name,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24*60*60*1000      //24 hours
    })

    await user.save();      //saved user to the database.

    //jwt
    generateTokenAndSetCookie(res, user._id);       //Hum res isliye bhej rahe hain kyunki cookie sirf res ke through hi set ho sakti hai.  Request (req) cookie receive karta hai and Response (res) cookie bhejta hai.

    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
        success:true, 
        message:"User created Successfully.",
        user:{              //spread the user document and make the password undefined jisse pata nhi chale.
            ...user._doc,       //user._doc → actual MongoDB document ,password hata diya → leak nahi hoga.
            password: undefined,    
        },
    });

    } catch (error) {
        res.status(400).json({success: false,message: error.message}); 
    }


};

export const verifyEmail = async (req, res) => {
    // 1 2 3 4 5 6

    const {code} = req.body;

    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }     //$gt ka matlab greater than hota hai, equal nahi.
            // So query ka matlab: Aisa user do jiska expiry time, Aisa user do jiska expiry time
        })

        if(!user) {
            return res.status(400).json({success: false, message: "Invalid or expired verification code." })
        }

        user.isVerified= true;
        //kyuki ab verification token ka kaam khtm toh isko database se hata do.
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({
            success: true, 
            message: "Email verified successfully.",
            user: {
                ...user._doc,
                password: undefined,
            }
        });

    } catch (error) {
        console.log("Error in verifyEmail",error);

        res.status(500).json({success:false, message: "Internal server error."});
        //HTTP status codes:
        //200 series: Success
        //300 series : redirect
        //400 series : Client ki galti.
        //500 series : Server ki galti.
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        //first check email is valid or not.
        const user = await User.findOne({email});
        if(!user ){
            // Generic message so attackers can't tell which emails are registered (no enumeration).
            return res.status(401).json({success: false, message: "Invalid credentials."});        //industry: 401 Unauthorized : Wrong credentials.
        }

        //now check whether password matches or not.
        const isPasswordValid = await bcryptjs.compare(password, user.password);    //ye kya karega DB se user.password wale ko pehle unhash karega then match with password entered.

        if(!isPasswordValid)
        {
            return res.status(401).json({success: false, message: "Invalid credentials."});       //401 -> Unauthorised
        }

        if(!user.isVerified)
        {
            return res.status(403).json({success: false, message: "Please verify your email before logging in."});      //industry : 403 Forbidden-> Unauthorised.
        }

        //Now we will generate the token and set cookie to remember him as logged in.
        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success:true,
            message: "User logged in successfully.",
            user: {
                ...user._doc,
                password: undefined,
            }
        })

    } catch (error) {
        console.log("Error :",error);
        res.status(500).json({success: false, message: "Internal server error."});
    }
};

export const logout = async (req, res) => {
    // res.send("Logout Route.");
    res.clearCookie("token");
    res.status(200).json({success: true, message: "Logged out successfully."});
};


export const forgotPassword = async (req, res) => {
    const {email} = req.body;

    try{
        const user = await User.findOne({email});

        // Always respond the same way whether or not the email exists,
        // so an attacker can't use this endpoint to discover registered emails.
        if(!user)
        {
            return res.status(200).json({success: true, message: "If an account exists for this email, a reset link has been sent."});
        }

        // Generate reset token.
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1000*60*15;    // 15 minutes.

        user.resetPasswordToken = resetToken;           //ye reset token banare hai, jab reset wale email mai when user will click reset password to phir vo ye token wale URL m le aayega.
        user.resetPasswordExpiresAt = resetTokenExpiresAt;
        await user.save();

        await sendForgotPasswordEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);        //due to the above only , we are also passing token. token wala url , it will pe secured and safe to change password.
        // Now it is now very good practise to put our client url : "http://localhost:5173", just like that , hence we will env variable.
        //IMP : PORTS :
        //5173 for FRONTEND, 5000 for BACKEND, 3000 - bas ek aur Frontend port(old).

        res.status(200).json({
            success: true,
            message: "If an account exists for this email, a reset link has been sent.",
        });

    } catch (error) {
        console.log("Error in forgotPassword ",error);
        res.status(400).json({success:false, message: error.message});
    }
};


export const resetPassword = async (req, res) => {
    try {
        const {token} = req.params;     //ye humlog bheje hai , url m dynamic karke tha , toh usko nikalne ke liye , req.params karte hai.
        const {password} = req.body;    //ye user type karke bhejega , hence req.body krre humlog.

        if(!password || password.length < 6)
        {
            return res.status(400).json({success: false, message: "Password must be at least 6 characters long."});
        }

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: {$gt: Date.now()}
        });

        // IMPORTANT: return here, otherwise execution continues on a null user and crashes.
        if(!user)
            return res.status(400).json({success: false, message: "Invalid or expired token."});

        //now we can update the password.
        const hashedPassword = await bcryptjs.hash(password, 10);
        user.password = hashedPassword;     //DB m real password store nhi karte.

        //reset fields ko null kardo.
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({success: true, message: "Password reset successfully."});
    } catch (error) {
        console.log("Error in resetPassword",error);
        res.status(400).json({success: false, message: error.message});
    }
};

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");   //here select me "-password" karne se vo password ko select nhi karega.
        
        if(!user)
            return res.status(404).json({success: false, message: "User not found."});

        res.status(200).json({success:true, user}); 

    } catch (error) {
        console.log("Error in Auth",error);
        res.status(500).json({success:false, message:error.message});
    }
};