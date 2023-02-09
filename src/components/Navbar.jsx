import { signOut } from "firebase/auth"
import { useAuthContext } from "../contexts/AuthContext"
import { auth } from "../firebase"

function Navbar() {
  const {currentUser: {photoURL, displayName}} = useAuthContext()

  return (
    <div className="flex justify-between items-center p-3">
      <h1 className="text-2xl font-bold text-green-700">Chatter!</h1>
      <div className="flex items-center justify-end">
        <img
          className="w-10 h-10 rounded-full object-cover mr-2"
          src={photoURL}
        />
        <p>{displayName}</p>
        <button
          onClick={() => signOut(auth)}
          className="px-3 py-1 text-sm rounded-full ml-2 bg-green-800 hover:bg-green-900"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar
