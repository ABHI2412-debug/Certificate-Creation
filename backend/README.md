Backend (Node/Express + Mongoose) - Quick start

1) Install dependencies
   cd d:\internships\Amdox internship\cvs\backend
   npm install

2) Copy env example and update values:
   cp .env.example .env
   - MONGO_URI: your MongoDB connection URI
   - JWT_SECRET, JWT_REFRESH_SECRET: strong secrets
   - UPLOAD_DIR (optional): path to store generated certificates (default: ./uploads/certificates)
   - FRONTEND_URL (optional): URL for QR verification (default: http://localhost:3000)

3) Start server:
   npm run dev  # dev uses nodemon
   npm start    # production

4) Endpoints:
   POST /api/auth/register
   POST /api/auth/login
   GET  /api/certificates/:certificateId
   POST /api/certificates/bulk-upload   (admin only)
