import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        default: Date.now       //Date.now means current time ka timestamp return krta h in milliseconds... (Fun fact: milliseconds since 1 Jan 1970)
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date
} , {timestamps: true});
//now since last 4 m single fields the hence we didn't need to create an object , i.e, {type:Boolean, deafult:false etc etc}.... aise kuch krne ka zaroorat nhi sidha bhi kar skte hn.
//createdat and updatedat will be automatically addded into the documents.


export const User = mongoose.model('User', userSchema);
//here User is JS variable. (Kuch bhi ho skta hn.)
//'User' is Mongoose Model name. Ye Model naam register krta h 'User' and then collection banta hn 'users' karke. (Lowercase, and plural).
//Best prac -> same rakho dono.