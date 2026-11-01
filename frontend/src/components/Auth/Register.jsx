import { useState } from 'react'

const Register = ({ handleRegister, showLogin, error }) => {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const submitHandler = (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    handleRegister({ firstName, email, password })
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-emerald-700 bg-[#1c1c1c] p-6 shadow-xl sm:p-10">
        <h1 className="text-3xl font-semibold">Create account</h1>
        <p className="mt-2 text-sm text-gray-400">Register as an employee to access your tasks.</p>
        {error && <p role="alert" className="mt-4 rounded-lg bg-red-950 px-4 py-3 text-sm text-red-200">{error}</p>}

        <form onSubmit={submitHandler} className="mt-8 flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-sm text-gray-300">
            Full name
            <input
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
              maxLength={60}
              autoComplete="name"
              type="text"
              placeholder="Enter your name"
              className="rounded-lg border border-gray-600 bg-[#111] px-4 py-3 text-white outline-none focus:border-emerald-500"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-gray-300">
            Email
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
              type="email"
              placeholder="you@example.com"
              className="rounded-lg border border-gray-600 bg-[#111] px-4 py-3 text-white outline-none focus:border-emerald-500"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-gray-300">
            Password
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
              type="password"
              placeholder="At least 6 characters"
              className="rounded-lg border border-gray-600 bg-[#111] px-4 py-3 text-white outline-none focus:border-emerald-500"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-gray-300">
            Confirm password
            <input
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
              type="password"
              placeholder="Re-enter your password"
              className="rounded-lg border border-gray-600 bg-[#111] px-4 py-3 text-white outline-none focus:border-emerald-500"
            />
          </label>

          <button
            type="submit"
            className="mt-2 rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <button onClick={showLogin} className="font-semibold text-emerald-400 hover:text-emerald-300">
            Log in
          </button>
        </p>
      </section>
    </main>
  )
}

export default Register
