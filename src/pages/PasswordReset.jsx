import { useState } from "react"
import { Link } from "react-router-dom"
import { auth } from "../firebase"
import { sendPasswordResetEmail } from "firebase/auth"

function PasswordReset() {
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState("")

  const handlePasswordReset = async (e) => {
    e.preventDefault()

    try {
      await sendPasswordResetEmail(auth, email)
      setSuccess(true)
    } catch (err) {
      console.log(err)
      setError(true)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center bg-red-700 px-20 py-10 rounded-lg">
        <h1 className="text-2xl -mt-5 mb-2">
          Welcome to{" "}
          <span className="text-green-600 underline-offset-4 underline font-bold">
            Chatter!
          </span>
        </h1>
        <p>Enter your email below</p>
        <form className="flex flex-col mt-1" onSubmit={handlePasswordReset}>
          <input
            className="bg-transparent placeholder:text-green-600 outline-none border-b rounded mb-1.5 px-4 py-1"
            type="email"
            placeholder="Email"
            autoComplete="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && (
            <p className="text-sm pt-1 px-1 max-w-max mx-auto rounded-lg font-bold bg-green-100 text-red-700">
              Email not found!
            </p>
          )}
          {success && (
            <p className="text-sm pt-1 px-1 max-w-max mx-auto rounded-lg font-bold bg-green-100 text-green-700">
              Check your Email!
            </p>
          )}

          <button
            className="bg-green-800 hover:bg-green-900 rounded-full mt-1.5 pt-2 pb-1"
            type="submit"
            onClick={handlePasswordReset}
          >
            Send password link
          </button>
        </form>
        <p className="mt-1">
          Back to{" "}
          <Link
            to="/login"
            className="text-green-600 hover:text-white font-bold"
          >
            Login!
          </Link>
        </p>
      </div>
    </div>
  )
}

export default PasswordReset
