import { motion } from "framer-motion";
// now to make them animated , we will be using framer-motion.  -> with this we can pretty much put animations very quickly.

//little facts
//xl -> 24 pixels


//so this will gonna take the props.


//absolute lagane pe sab alag-alag kyu ho gaye?
// Default HTML behaviour: Sab ek ke niche ek (flow layout).
//Jab tu absolute karta hai: Absolute element document flow se bahar nikal jaata hai.
//Matlab:   Ye doosre elements ko “exist hi nahi” maanta ,Har ek apni independent position le sakta hai.
//Hence sab overlap bhi kar skte hai , and sab alag-alag jagah bhi reh skte hai. Thats why we use absolute for background effects.


//FloatingShape ko jo attributes pass karega, unko yahin receive karega. this is prop destructuring.    Imp Rule : Props ka naam SAME hona chahiye.

//className -> this is Tailwind CSS
//rounded-full means circle, Dynamic background color, Width + height, Transparent, Soft glow effect.

//for top, left we are putting them in style.   % dynamic hota hai and Tailwind dynamic % support nhi karta.    
//So, top="-5%" and left="10%" -> inline CSS .  POsition yahi se set hoti hai.      So style={{This is the starting point.}}
const FloatingShape = ( {color, size, top, left, delay}) => {
    return (
       
        <motion.div
            className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl `}

            style={{ top, left}}

            animate={{
                y: ["0%", "100%" ,"0%"],
                x: ["0%", "100%", "0%"],
                rotate: [0, 360],
            }}

            transition={{
                duration: 20,
                ease: "linear",
                repeat: Infinity,
                delay
            }}

            aria-hidden="true"     
        />w
    );
};

export default FloatingShape;

//animate:
//+y -> niche , -y -> upar.
//+x -> right , -x -> left.
//Framer Motion me x / y percentage element ke APNE size ke relative hota hai, screen ke nahi
//So Framer Motion % = element size , iss liye vo 100% of apna y-size (yani ke height) move karega adn then wapas.
//Screen movement ke liye vh / vw use karo.


//transition :
//duration : 20 sec/loop. ease: speed smooth rahe, repeat: humesa, delay: start hone se pehle rekna(saare shapes ek saath move na karein, jisse natural feel aaye.)

//aria-hidden : Accessibility (A11y) ke liye, Screen readers isko ignore karein, ye decorative element hai.