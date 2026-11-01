# Employee Management System

## Run with local MongoDB

1. Install and start MongoDB Community Server. The default connection is
   `mongodb://127.0.0.1:27017/employee_management`.
2. From the backend folder, copy `.env.example` to `.env`. Set a private
   `JWT_SECRET` with at least 32 characters and choose an `ADMIN_PASSWORD`.
3. Install both sets of dependencies:

   ```powershell
   Set-Location backend
   Copy-Item .env.example .env
   npm install
   Set-Location ..\frontend
   npm install
   ```

4. Start the API in one terminal:

   ```powershell
   Set-Location backend
   npm run dev
   ```

5. In another terminal, start the React app:

   ```powershell
   Set-Location frontend
   npm run dev
   ```

   Open the URL Vite prints in the terminal. If port 5173 is already in use,
   Vite will automatically choose another port, such as 5174. Keep both
   terminals running; the frontend proxies `/api` requests to the backend.

The API seeds the existing demo employees and their tasks only when the
database has no employee accounts. Demo employee passwords are `123`.
The admin email is the value of `ADMIN_EMAIL`; its password is the value
of `ADMIN_PASSWORD` in `backend/.env`.

The browser communicates with the API through the frontend's `/api` development
proxy, which forwards requests to `http://127.0.0.1:5000`. Registration, login,
employee task states, and admin assignments are stored in MongoDB. Passwords
are hashed before storage.

## Deploy on Netlify

Netlify installs the backend and frontend dependencies separately, builds the
frontend, and serves the Express API through the function in
`backend/netlify/functions`. Configure these
environment variables in **Site configuration → Environment variables**
before deploying:

- `MONGO_URI`: MongoDB Atlas connection string; allow Netlify's outbound
  connections in the Atlas network access settings.
- `JWT_SECRET`: a private random value with at least 32 characters.
- `ADMIN_EMAIL` and `ADMIN_PASSWORD`: the admin account credentials.

Then trigger a new deploy. Netlify uses the build and publish settings in
`netlify.toml`; the `/api/*` rewrite sends API requests to the function, while
the React app is served from `frontend/dist`. The local backend process and
MongoDB server are only for development.
Never put production credentials in `VITE_*` variables or commit them to Git.
