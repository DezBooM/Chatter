import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../firebase"

function Login() {
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = e.target[0].value
    const pass = e.target[1].value

    try {
      await signInWithEmailAndPassword(auth, email, pass)
      navigate("/")
    } catch (err) {
      setError(true)
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center bg-red-700 px-20 py-10 rounded-lg">
        <h1 className="text-2xl -mt-5 mb-2">
          Welcome to{" "}
          <span className="text-green-500 underline font-bold">Chatter!</span>
        </h1>
        <p>Login</p>
        <form className="flex flex-col gap-3 mt-1" onSubmit={handleSubmit}>
          <input
            className="bg-transparent placeholder:text-green-500 outline-none border-b rounded px-4 py-1"
            type="email"
            placeholder="Email"
            autoComplete="Email"
          />
          <input
            className="bg-transparent placeholder:text-green-500 outline-none border-b rounded px-4 py-1"
            type="password"
            placeholder="Password"
          />
          <button
            className="bg-green-800 hover:bg-green-900 rounded-full outline-none py-1"
            type="submit"
            onSubmit={handleSubmit}
          >
            Login
          </button>
          {error && (
            <p className="text-sm pt-1 px-1 rounded-lg font-bold bg-green-100 text-red-700">
              Email or password are invalid!
            </p>
          )}
        </form>
        <p className="mt-1">
          You don't have account?{" "}
          <Link
            to="/register"
            className="text-green-500 hover:text-white font-bold"
          >
            Register!
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
