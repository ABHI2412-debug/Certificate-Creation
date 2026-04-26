Client (React + Vite + Tailwind)

1) Install dependencies
   cd d:\internships\Amdox internship\cvs\client
   npm install

2) Prepare environment:
   create .env
   VITE_API_URL=http://localhost:5000/api  # point to backend

3) Run:
   npm run dev

4) Access app:
   http://localhost:3000

Quick start:
1) Install dependencies
   cd client
   npm install

2) Prepare environment:
   create .env
   VITE_API_URL=http://localhost:5000/api

3) Run:
   npm run dev   # starts local vite dev server

Troubleshooting "Cannot find module 'vite'":
- Ensure you ran npm install inside the client folder.
- Verify vite is installed locally:
  npm ls vite
- If missing or corrupted, try:
  rm -rf node_modules package-lock.json
  npm install
- Use local vite via the scripts:
  npm run dev
- Avoid depending on a global Vite CLI. If you installed it globally, uninstall:
  npm uninstall -g vite
- If your system still resolves to a global binary, run:
  npx vite --config ./vite.config.js
- Ensure your Node.js version is supported (Node >= 18 recommended).

If you still see the error, please paste the output of:
- node -v
- npm -v
- ls node_modules | grep vite
- npm ls vite
This information helps troubleshoot further.

Notes:
- This scaffold uses Zustand for local auth state and Axios for API.
- Update components/styles to match your designer requirements.
- Use `npm run dev` from the client directory.
- If your system defaults to a global vite binary, using `npx vite` or `npm run dev` ensures the local version will be invoked.
