
import { useState } from 'react'

const Login = ({ handleLogin, showRegister, error }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin({ email, password })
    setEmail('')
    setPassword('')
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-emerald-700 bg-[#1c1c1c] p-6 shadow-xl sm:p-10">
        <h1 className="text-3xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-sm text-gray-400">Log in to continue to your dashboard.</p>
        {error && <p role="alert" className="mt-4 rounded-lg bg-red-950 px-4 py-3 text-sm text-red-200">{error}</p>}
        <form onSubmit={submitHandler} className="mt-8 flex flex-col gap-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="Enter the Email"
            autoComplete="email"
            className="rounded-lg border border-gray-600 bg-[#111] px-4 py-3 text-white outline-none placeholder:text-gray-400 focus:border-emerald-500"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="Enter the password"
            autoComplete="current-password"
            className="rounded-lg border border-gray-600 bg-[#111] px-4 py-3 text-white outline-none placeholder:text-gray-400 focus:border-emerald-500"
          />

          <button
            type="submit"
            className="mt-2 rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            Log in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          New here?{' '}
          <button onClick={showRegister} className="font-semibold text-emerald-400 hover:text-emerald-300">
            Create an account
          </button>
        </p>
      </section>
    </main>
  )
}

export default Login
