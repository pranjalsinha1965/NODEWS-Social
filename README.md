
# NODEWS-Social  

NODEWS-Social is a social media web application built with the MERN stack, featuring user authentication using Passport.js and JWT-based tokens. It supports profile picture uploads with Multer and utilizes AJAX for dynamic updates. Secure RESTful APIs, tested via Postman, handle backend operations, API integrations, and frontend.

---

## 🚀 **Features**

- **User Authentication:** Login and signup using Passport.js (Local and JWT strategies).  
- **Secure RESTful APIs:** API endpoints protected with CSRF tokens and authentication.  
- **Profile Picture Uploads:** Image handling via **Multer**.  
- **Session & Token Authentication:** Supports persistent sessions and JWT-based security.  
- **Dynamic Frontend Updates:** Real-time updates using **AJAX**.  
- **Flash Notifications:** User feedback messages using `connect-flash`.  
- **Error Handling & Asynchronous Calls:** Robust backend logic with centralized error handling.  

---

## 🛠 **Tech Stack**

**Frontend:**  
- EJS for templating  
- AJAX for dynamic updates  

**Backend:**  
- Node.js  
- Express.js  

**Database:**  
- MongoDB with Mongoose ORM  

**Authentication:**  
- Passport.js (Local & JWT strategies)  

**Other Libraries:**  
- Multer for file uploads  
- Nodemailer for emails  
- Connect-Mongo for session storage  

---

## 📂 **Folder Structure**  

```
NODEWS-Social/
├── assets/              # Static files (CSS, images, JS)
├── config/              # Configuration (Passport strategies, DB setup)
├── controllers/         # Route controllers
├── models/              # Mongoose models
├── routes/              # Application routes
├── views/               # EJS templates
├── index.js             # Application entry point
├── package.json         # Node.js dependencies
└── README.md            # Project documentation
```

---

## 🔧 **Setup Instructions**

### **Prerequisites**

- Node.js (v14 or higher)  
- MongoDB (local or cloud instance)  

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/pranjalsinha1965/NODEWS-Social.git
   cd NODEWS-Social
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:  
   Create a `.env` file in the root directory with the following:
   ```env
   PORT=7862
   SESSION_SECRET=your-session-secret
   MONGODB_URI=your-mongodb-uri
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GOOGLE_CALLBACK_URL=http://localhost:7862/users/auth/google/callback
   ```

4. Run the application:
   ```bash
   npm start
   ```

5. Access the application at:
   ```
   http://localhost:7862
   ```

---

## 🛡 **Security Features**

- CSRF protection
- Secure password storage with bcrypt
- Token and session-based authentication
- Sanitized API endpoints

- Note:

** You're correct — if two-step verification is enabled for a Gmail account, NodeMailer won't work with just the standard username and password authentication **

Solution: 
Use an App Password
- Steps to Generate App Password for Gmail
- Go to Google Account Security.
- Under "Signing in to Google", enable Two-Step Verification if you haven't already.
- After enabling it, you'll see an option for App Passwords.
- Select App Passwords, then:
- Choose Mail as the app.
- Choose Other (custom) and give it a meaningful name, like NodeMailer.
- Google will generate a 16-character password.Copy that password.

---

## 📋 **API Testing**

All backend operations are tested using **Postman**. The API documentation can be extended for reference if required.

---

## 🤝 **Contributing**

Contributions are welcome! Fork the repository, create a feature branch, and submit a pull request.

---

## 📬 **Contact**

- **Author**: Pranjal Sinha  
- **LinkedIn**: [pranjalsinha02](https://www.linkedin.com/in/pranjalsinha02)
