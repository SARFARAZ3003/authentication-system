// Dev helper: list all users in the database (and their pending codes/tokens).
// Run from the project root:  node backend/scripts/listUsers.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";

dotenv.config();

const run = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    const users = await User.find({}).lean();

    console.log(`\nTotal users: ${users.length}\n`);
    for (const u of users) {
        console.log("──────────────────────────────");
        console.log("email:            ", u.email);
        console.log("name:             ", u.name);
        console.log("isVerified:       ", u.isVerified);
        console.log("verificationCode: ", u.verificationToken ?? "(none)");
        console.log("codeExpiresAt:    ", u.verificationTokenExpiresAt ?? "(none)");
        console.log("resetToken:       ", u.resetPasswordToken ?? "(none)");
        console.log("createdAt:        ", u.createdAt);
    }
    console.log("──────────────────────────────\n");

    await mongoose.disconnect();
    process.exit(0);
};

run().catch((err) => {
    console.error("Error:", err.message);
    process.exit(1);
});
