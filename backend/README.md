Backend (Node/Express + Mongoose) - Quick start

1) Install dependencies
   cd d:\internships\Amdox internship\cvs\backend
   npm install

2) Copy env example and update values:
   - Windows (PowerShell): copy .env.example .env
   - macOS/Linux: cp .env.example .env
   Required keys in .env:
   - MONGO_URI: your MongoDB connection URI
   - JWT_SECRET: strong secret for JWT signing
   - SESSION_SECRET: strong secret for session middleware
   - FRONTEND_URL: frontend URL (default: http://localhost:5173)
   - PORT (optional): backend port (default: 5000)
   - GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL: required for "Continue with Google"
   - UPLOAD_DIR (optional): path to store generated certificates (default: ./uploads/certificates)

3) Start server:
   npm run dev  # dev uses nodemon
   npm start    # production

4) Endpoints:
   POST /api/auth/register
   POST /api/auth/login
   GET  /api/certificates/:certificateId
   POST /api/certificates/bulk-upload   (admin only)
