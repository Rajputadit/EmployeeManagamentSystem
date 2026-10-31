# Employee Management System

## Run with local MongoDB

1. Install and start MongoDB Community Server. The default connection is
   `mongodb://127.0.0.1:27017/employee_management`.
2. Copy `.env.example` to `.env`. Set a private `JWT_SECRET` with at least
   32 characters and choose an `ADMIN_PASSWORD`.
3. Install dependencies with `npm install`.
4. In one terminal, start the API and MongoDB seed:

   ```powershell
   npm run server
   ```

5. In another terminal, start the React app:

   ```powershell
   npm run dev
   ```

The API seeds the existing demo employees and their tasks only when the
database has no employee accounts. Demo employee passwords are `123`.
The admin email is the value of `ADMIN_EMAIL`; its password is the value
of `ADMIN_PASSWORD` in `.env`.

The browser communicates with the API through Vite's `/api` development
proxy. Registration, login, employee task states, and admin assignments are
stored in MongoDB. Passwords are hashed before storage.
