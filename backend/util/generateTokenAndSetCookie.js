// Server ko yaad rahe: “ye wahi banda hai”.    Bas, JWT + cookie ka sirf yehi kaam hai.

import jwt from 'jsonwebtoken';     //token create/verify karne ke liye.

export const generateTokenAndSetCookie = (res, userId) => {             //User ke liye JWT banana aur usko secure cookie me set karna.

    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });


    //Cookie = browser ki pocket
    //browser m ek cookie set ho rha h jiska naam "token" hn.
    //res m cookie attach kar diye.
    res.cookie("token", token, {
        httpOnly: true,     //JS (frontend) cookie access nahi kar sakta.   XSS attacks se protection. ->  document.cookie se nahi dikhega.
        secure : process.env.NODE_ENV === 'production',         //http - localhost, https-production , means it will be secured in production(true ho jayega).
        sameSite: "strict",     //protection from attack CSRF.      dusri site se request aayi → cookie nahi jayegi
        maxAge: 7*24*60*60*1000,        //7 days
    })

    return token;
}

// Browser yaad rakhega 7 din tak, Jab tak: logout na kare, token expire na ho, cookie delete na ho

// Flow:
// 1.First time login ,2.User login/signup karta, 3.Server JWT banata, 4.JWT cookie me daal deta, 5.Browser silently save kar leta
//Next request (without login)
// Browser → request bhejta
// Browser → cookie automatically attach karta
// Server → JWT verify karta
// Server → bolta "haan tu wahi banda hai"