//we will check for the token whether it is valid or not.
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    //next() -> once we will call this next function , it will call the next function ,i.e,  checkAuth function from the auth.route.js. kyuki usme aise karke 2 functions the.

    const token = req.cookies.token;        //ab humlog jab cookie bananye the toh "token" naam rakhe the , hence yaha pe req.cookies.token , vrna jo naam rakhe the vo hota.
    //also to parse cookies from request, we will add a middleware in server.js

    if(!token)
        return res.status(401).json({success: false, message:"Unauthorized - no token provided"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) return res.status(401).json({success: false, message:"Unauthorized - invalid token"})

        //kyuki humlog jwt.sign karne waqt we did {userId} , hence humlog decode karke vo userId nikal skte hai.
        req.userId = decoded.userId;    //we will add a userId field to the request, which will be this decoded.userId
        next();     // now ab jo req jayega to checkAuth , then it will also have userId field.
        
    } catch (error) {
        console.log("Error in verifyToken",error);
        return res.status(500).json({success: false, message:"Internal Server Error."});
    }
};