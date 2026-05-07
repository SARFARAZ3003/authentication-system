import {MailtrapClient} from "mailtrap";
import dotenv from 'dotenv';

dotenv.config();     //process.env GLOBAL hota hai ,poore Node process ke liye.
// means : ek baar env inject ho gaya  ,phir har file me available hota hai

export const mailTrapClient = new MailtrapClient({
  endpoint: process.env.MAILTRAP_ENDPOINT,
  token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
  email : "mailtrap@demomailtrap.co",
  name : "Sarfaraz Says"  
}






















// const TOKEN = process.env.MAILTRAP_TOKEN;       //ye authorization key hai. "haan bhai, ye banda allowed hai email bhejne ke liye."
// const ENDPOINT = process.env.MAILTRAP_ENDPOINT;       //server ka address jaha request jaati hai. mtlb ki aisa : "Bhai email bhejne ke liye kis server ke gate pe knock krna hai."

// const client = new MailtrapClient({           //yaha hum mailtrap ke saath connection bana rahe hai. like: mongoose.connect().    iske baad humlog client.send() karke email bhej skte hai.
//   token: TOKEN,
//   endpoint: ENDPOINT,
// });

// const sender = {
//   email: "hello@demomailtrap.co",
//   name: "Sarfaraz Says",
// };
// const recipients = [            //ye array m hota h, ek se zyda bando ko email bhej skte ho , newsletter, bulk emails.
//   {
//     email: "sarfaraz.hussain.work@gmail.com",
//   }
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",       //ye Mailtrap ke dashboard ke liye hai.
//   })
//   .then(console.log, console.error);