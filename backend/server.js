//we can name index , we will go with server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './db/connectDB.js';      //since we changed type to module , hence we will have to put .js whenever we import from a local file.
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Render (and most hosts) put a proxy in front of the app, so the real client IP
// arrives in the 'X-Forwarded-For' header. Trust exactly ONE proxy hop so
// express-rate-limit can identify clients correctly (trusting "all" would let
// clients spoof their IP, so we keep it to 1).
app.set('trust proxy', 1);

// __dirname is not available in ES modules, so we rebuild it from the file URL.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Secure HTTP headers (XSS, clickjacking, MIME-sniffing protections).
// crossOriginResourcePolicy disabled so the bundled frontend assets load fine.
app.use(helmet({ crossOriginResourcePolicy: false }));

// During local dev the frontend runs on a different port (e.g. 5173, or 5174 if
// that's taken), so we allow any localhost origin with credentials enabled so the
// auth cookie is accepted. In production the frontend is served from this same
// server, so no cross-origin call happens and this block is skipped.
if (process.env.NODE_ENV !== 'production') {
    app.use(cors({ origin: /^http:\/\/localhost:\d+$/, credentials: true }));
}

app.use(express.json());    //allows us to parse incoming requests: req.body
app.use(cookieParser());    //allows us to parse incoming cookies, i.e, for verifyToken.js

// Rate limit the auth endpoints to slow down brute-force / credential-stuffing.
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,   // 15 minutes
    max: 50,                    // 50 requests per IP per window
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: "Too many requests, please try again later." },
});

app.use("/api/auth", authLimiter, authRoutes);   //Is path se start hone wali har request ko yaha bhej do i.e, authRoutes pe.

// In production, serve the built React app and let client-side routing handle the rest.
if (process.env.NODE_ENV === 'production') {
    const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');
    app.use(express.static(frontendDist));

    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(frontendDist, 'index.html'));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port: " + PORT);
});
