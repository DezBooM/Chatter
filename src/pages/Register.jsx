import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useState } from "react"
import { RiImageAddLine } from "react-icons/ri"
import { auth, db, storage } from "../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { doc, setDoc } from "firebase/firestore"
import { Link, useNavigate } from "react-router-dom"
import { v4 as uuid } from "uuid"

function Register() {
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const display = e.target[0].value
    const email = e.target[1].value
    const pass = e.target[2].value
    const image = e.target[3].files[0]

    try {
      const res = await createUserWithEmailAndPassword(auth, email, pass)

      const storageRef = ref(storage, `${display + uuid()}`)

      await uploadBytesResumable(storageRef, image).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName: display,
              photoURL: downloadURL,
            })
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: display,
              email,
              photoURL: downloadURL,
            })
            await setDoc(doc(db, "userChats", res.user.uid), {})
            navigate("/")
          } catch (err) {
            console.log(err)
            setError(true)
          }
        })
      })
    } catch (err) {
      setError(true)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center bg-red-700 px-20 py-10 rounded-lg">
        <h1 className="text-2xl -mt-5 mb-2">
          Welcome to{" "}
          <span className="text-green-700 underline font-bold">Chatter!</span>
        </h1>
        <p>Register</p>
        <form className="flex flex-col gap-3 mt-2" onSubmit={handleSubmit}>
          <input
            className="bg-transparent placeholder:text-green-700 outline-none border-b rounded p-1"
            type="text"
            placeholder="Display name"
            required
          />
          <input
            className="bg-transparent placeholder:text-green-700 outline-none border-b rounded p-1"
            type="email"
            placeholder="Email"
            required
          />
          <input
            className="bg-transparent placeholder:text-green-700 outline-none border-b rounded p-1"
            type="password"
            minLength={6}
            placeholder="Password"
            required
          />
          <div>
            <input
              className="hidden"
              type="file"
              id="avatar"
              accept="image/jpg, image/jpeg, image/png"
              required
            />
            <label className="flex cursor-pointer" htmlFor="avatar">
              <span className="text-xl mr-2">
                <RiImageAddLine />
              </span>
              Upload Avatar
            </label>
          </div>
          <button
            className="bg-green-800 hover:bg-green-900 rounded-full outline-none py-1"
            type="submit"
            onSubmit={handleSubmit}
          >
            Register
          </button>
          {error && (
            <span className="text-sm pt-1 px-1 rounded-lg font-bold bg-green-100 text-red-700">
              Something went wrong
            </span>
          )}
        </form>
        <p className="mt-1">
          You already registered?
          <Link
            to="/login"
            className="text-green-700 hover:text-white font-bold"
          >
            {" "}
            Login!
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
