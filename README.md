# 🔐 MERN Stack Authentication System

A comprehensive, full-stack authentication system featuring secure user onboarding, email verification, and state-of-the-art security practices.

## 🚀 Features

* **Robust Authentication**: Secure User Signup and Login using JWT (JSON Web Tokens).
* **Email Workflow**: Automated Email Verification and Password Reset Flow integrated with Mailtrap.
* **Enhanced Security**: Protected routes using custom Middleware and hashed password storage.
* **Modern UI**: Fully responsive frontend built with React, Tailwind CSS, and Framer Motion for smooth animations.
* **State Management**: Efficient data handling using modern React patterns.

## 🛠️ Tech Stack

### Frontend
* **React.js**: Library for building the user interface.
* **Tailwind CSS**: For rapid and responsive styling.
* **Framer Motion**: Used for the "FloatingShape" and other UI animations.

### Backend
* **Node.js & Express.js**: Server-side environment and framework.
* **MongoDB**: NoSQL database for flexible user data management.
* **JWT**: Ensuring secure, stateless session management.
* **Mailtrap**: SMTP testing for verification and reset emails.

## 📁 Project Structure

* `/backend`: Node/Express server, MongoDB models, and auth routes.
* `/frontend`: React application, UI components, and authentication pages.

## ⚙️ Installation & Setup

1. **Clone the repo**: `git clone https://github.com/SARFARAZ3003/authentication-system.git`
2. **Install Backend Dependencies**: `npm install` in the root folder.
3. **Install Frontend Dependencies**: `cd frontend && npm install`.
4. **Environment Variables**: Create a `.env` file in the root with `MONGO_URI`, `PORT`, `JWT_SECRET`, and Mailtrap credentials.
5. **Run the App**: `npm run dev`.