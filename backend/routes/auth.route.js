import express from "express";
import { login, logout, signup, verifyEmail, forgotPassword, resetPassword, checkAuth } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);


//all will be post as we are sending data.
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.post('/verify-email', verifyEmail)
router.post('/forgot-password', forgotPassword)

router.post('/reset-password/:token', resetPassword);       //now here it is :token , then in resetPassword we will do {token} = req.params;
//since here token could be dynamic , we will put ':'before it.

export default router;      //here default means ki aage jis bhi file m yaha se isko import karnge naam humlog apne mann ka kuch bhi rakhe lekin usme aayega ye 'router'.  Toh humare authRoutes of server.js m ye aa gya.
//agr default export nhi krnge toh phir naam change ni kar skte and curly braces compulsion h.      Eg : See import authRoutes in server.jsP