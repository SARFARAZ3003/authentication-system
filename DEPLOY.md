# Deploying to Render (full-stack, single service)

The whole app deploys as **one** Render web service: Express serves the REST API
**and** the built React frontend from the same origin. Same-origin means the
`httpOnly`, `sameSite=strict` auth cookie works with zero CORS configuration.

## Prerequisites
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster + connection string.
  - In Atlas → Network Access, allow `0.0.0.0/0` (or Render's IPs) so Render can connect.
- A Gmail account with **2-Step Verification enabled** and an
  [App Password](https://myaccount.google.com/apppasswords) generated (16 chars).
- This repo pushed to GitHub.

## Steps

1. **Push your latest code to GitHub** (see commit instructions below).

2. **Create the service on Render**
   - Go to <https://dashboard.render.com> → **New** → **Blueprint**.
   - Connect your GitHub repo. Render reads `render.yaml` and proposes the service.
   - (Or **New → Web Service** manually with:
     Build Command = `npm run build`, Start Command = `npm start`.)

3. **Set environment variables** (Render dashboard → your service → Environment):
   | Key | Value |
   |-----|-------|
   | `NODE_ENV` | `production` |
   | `MONGO_URI` | your Atlas connection string |
   | `JWT_SECRET` | a long random string |
   | `GMAIL_USER` | your full gmail address |
   | `GMAIL_APP_PASSWORD` | your 16-char Gmail App Password |
   | `CLIENT_URL` | your live URL, e.g. `https://secure-auth-microservice.onrender.com` |

   > Do **not** set `PORT` — Render injects it and the server reads `process.env.PORT`.

4. **Deploy.** First build takes a few minutes (installs backend + frontend, builds React).

5. **Update `CLIENT_URL`** once you know the final URL, then redeploy so password-reset
   emails point to the right place.

## Local development
```bash
# backend (root)
npm install
npm run dev            # http://localhost:5000

# frontend (separate terminal)
cd frontend
npm install
npm run dev            # http://localhost:5173
```
In dev, CORS is enabled for `http://localhost:5173` so cookies work across ports.

## Notes / free-tier gotchas
- Render free services **spin down when idle**; the first request after a sleep
  takes ~30–50s to wake. Fine for a portfolio demo.
- Gmail SMTP allows ~500 emails/day — plenty for a demo, not for production volume.
