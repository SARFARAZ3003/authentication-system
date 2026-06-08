# Deploying to Render (full-stack, single service)

The whole app deploys as **one** Render web service: Express serves the REST API
**and** the built React frontend from the same origin. Same-origin means the
`httpOnly`, `sameSite=strict` auth cookie works with zero CORS configuration.

## Prerequisites
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster + connection string.
  - In Atlas → Network Access, allow `0.0.0.0/0` (or Render's IPs) so Render can connect.
- A [Brevo](https://app.brevo.com) account (free) with an API key and a
  **verified sender email**. Brevo sends over HTTPS, so it works on Render
  (which blocks outbound SMTP).
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
   | `BREVO_API_KEY` | your Brevo API key |
   | `SENDER_EMAIL` | your verified Brevo sender email |
   | `SENDER_NAME` | `Secure Auth` (display name) |
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
- Brevo's free tier allows 300 emails/day — plenty for a demo.
