import {
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth, db, facebookProvider, googleProvider } from "../firebase"
import { SpinnerDotted } from "spinners-react"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"

function Login() {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const navigate = useNavigate()

  const handleGoogleAuth = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider)
      const check = await getDoc(doc(db, "userChats", res.user.uid))
      if (!check.exists()) {
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName: res.user.displayName.split(" ")[0].toLowerCase(),
          email: res.user.email,
          photoURL: res.user.photoURL,
        })
        await setDoc(doc(db, "userChats", res.user.uid), {})
      }
      await updateProfile(res.user, {
        displayName: res.user.displayName.split(" ")[0],
      })
      navigate("/", { replace: true })
    } catch (err) {
      console.log(err)
    }
  }

  const handleFacebookAuth = async () => {
    try {
      const res = await signInWithPopup(auth, facebookProvider)
      const check = await getDoc(doc(db, "userChats", res.user.uid))
      if (!check.exists()) {
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName: res.user.displayName.split(" ")[0].toLowerCase(),
          email: res.user.email,
          photoURL: res.user.photoURL,
        })
        await setDoc(doc(db, "userChats", res.user.uid), {})
      }
      await updateProfile(res.user, {
        displayName: res.user.displayName.split(" ")[0],
      })
      navigate("/", { replace: true })
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const email = e.target[0].value
    const pass = e.target[1].value

    try {
      await signInWithEmailAndPassword(auth, email, pass)
      navigate("/", { replace: true })
    } catch (err) {
      setError(true)
      console.log(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(false)
  }, [navigate])

  return (
    <div className="min-h-screen flex justify-center items-center">
      {loading ? (
        <SpinnerDotted size="150" color="rgb(185 28 28)" />
      ) : (
        <div className="flex flex-col justify-center items-center bg-red-700 px-20 py-10 rounded-lg">
          <h1 className="text-xl scale-125 sm:scale-100 tracking-tighter sm:text-2xl -mt-5 mb-2">
            Welcome to{" "}
            <span className="text-green-600 underline-offset-4 underline font-bold">
              Chatter!
            </span>
          </h1>
          <p>Login</p>
          <form className="flex flex-col gap-3 mt-1" onSubmit={handleSubmit}>
            <input
              className="bg-transparent placeholder:text-green-600 outline-none border-b rounded px-4 py-1"
              type="email"
              placeholder="Email"
              autoComplete="Email"
              required
            />
            <div className="flex relative">
              <input
                className="bg-transparent placeholder:text-green-600 outline-none border-b rounded px-4 py-1 w-full pr-8"
                type={showPass ? "text" : "password"}
                placeholder="Password"
                required
              />
              {!showPass ? (
                <AiFillEyeInvisible
                  className="absolute right-1 text-2xl top-1 text-green-600"
                  onClick={() => setShowPass(true)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-1 text-2xl top-1 text-green-600"
                  onClick={() => setShowPass(false)}
                />
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <button
                className="bg-green-800 hover:bg-green-900 rounded-full pt-2 pb-1"
                type="submit"
                onSubmit={handleSubmit}
              >
                Login with Email
              </button>
              <button
                className="bg-green-800 hover:bg-green-900 rounded-full px-4 pt-2 pb-1 flex items-center leading-4"
                type="button"
                onClick={handleGoogleAuth}
              >
                {" "}
                <span className="mr-1 mb-1 text-xl">
                  <FcGoogle />
                </span>
                Sign in with Google{" "}
              </button>
              <button
                className="bg-green-800 hover:bg-green-900 rounded-full px-4 pt-2 pb-1 flex items-center leading-4"
                type="button"
                onClick={handleFacebookAuth}
              >
                <span className="mr-1 mb-1 text-xl text-[#4267B2] bg-white rounded-full">
                  <FaFacebook />
                </span>
                Sign in with Facebook{" "}
              </button>
            </div>
            {error && (
              <p className="text-sm pt-1 px-1 rounded-lg font-bold bg-green-100 text-red-700">
                Email or password are invalid!
              </p>
            )}
          </form>
          <p className="mt-1">
            Forgot password?{" "}
            <Link
              to="/password-reset"
              className="text-green-600 hover:text-white font-bold"
            >
              Reset here!
            </Link>
          </p>
          <p>
            You don't have account?{" "}
            <Link
              to="/register"
              className="text-green-600 hover:text-white font-bold"
            >
              Register!
            </Link>
          </p>
        </div>
      )}
    </div>
  )
}

export default Login
