# Employee Management System

## Run with local MongoDB

1. Install and start MongoDB Community Server. The default connection is
   `mongodb://127.0.0.1:27017/employee_management`.
2. Copy `.env.example` to `.env`. Set a private `JWT_SECRET` with at least
   32 characters and choose an `ADMIN_PASSWORD`.
3. Install dependencies with `npm install`.
4. In a terminal, start the API from the `server` folder:

   ```powershell
   cd M:\EmployeeM\server
   npm run server
   ```

   The API loads `.env` from the project root, even when started from this
   folder.

5. In another terminal, start the React app from the project root:

   ```powershell
   cd M:\EmployeeM
   npm run dev
   ```

   Open the URL Vite prints in the terminal. If port 5173 is already in use,
   Vite will automatically choose another port, such as 5174.

The API seeds the existing demo employees and their tasks only when the
database has no employee accounts. Demo employee passwords are `123`.
The admin email is the value of `ADMIN_EMAIL`; its password is the value
of `ADMIN_PASSWORD` in `.env`.

The browser communicates with the API through Vite's `/api` development
proxy, which forwards requests to `http://127.0.0.1:5000`. Registration, login,
employee task states, and admin assignments are stored in MongoDB. Passwords
are hashed before storage.

## Deploy on Netlify

The Netlify build includes the Express API as a serverless function. Configure
these environment variables in **Site configuration → Environment variables**
before deploying:

- `MONGO_URI`: MongoDB Atlas connection string; allow Netlify's outbound
  connections in the Atlas network access settings.
- `JWT_SECRET`: a private random value with at least 32 characters.
- `ADMIN_EMAIL` and `ADMIN_PASSWORD`: the admin account credentials.

Then trigger a new deploy. The `/api/*` rewrite in `netlify.toml` sends API
requests to the function, while the React app remains served from `dist`.
Netlify runs the API as a function, so `npm run server` and a local MongoDB
server are not used in production; use MongoDB Atlas for the deployed app.
Never put production credentials in `VITE_*` variables or commit them to Git.
