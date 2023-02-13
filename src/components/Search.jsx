import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import { useAuthContext } from "../contexts/AuthContext"
import { useChatContext } from "../contexts/ChatContext"
import { db } from "../firebase"

function Search() {
  const [search, setSearch] = useState("")
  const [debouncedValue] = useDebounce(search, 200)
  const [user, setUser] = useState(null)
  const { currentUser } = useAuthContext()
  const { dispatch } = useChatContext()

  useEffect(() => {
    if (debouncedValue) {
      handleSearch(debouncedValue)
    }
    if (search !== user?.displayName) {
      setUser(null)
    }
  }, [debouncedValue])

  const handleSearch = async (search) => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", search.toLowerCase())
    )

    try {
      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleKey = (e) => {
    e.key === "Enter" && handleSearch(search)
  }

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid
    try {
      const res = await getDoc(doc(db, "chats", combinedId))
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] })
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        })
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        })
      }
    } catch (err) {
      console.log(err)
    }
    dispatch({ type: "CHANGE_USER", payload: user })
    setSearch("")
    setUser(null)
  }

  return (
    <div className="px-3">
      <div className="border-b border-white">
        <input
          className="w-full bg-transparent outline-none placeholder:white placeholder:text-white placeholder:opacity-80"
          placeholder="Search for users like Petar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKey}
        />
        {user && (
          <div
            className="flex items-center gap-2 py-1 hover:bg-red-900"
            onClick={handleSelect}
          >
            <img
              className="w-14 h-14 rounded-full object-cover"
              src={user.photoURL}
            />
            <span className="font-bold text-lg">
              {user.displayName?.charAt(0).toUpperCase() +
                user.displayName?.slice(1)}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
