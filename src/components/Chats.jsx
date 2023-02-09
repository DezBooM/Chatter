import { doc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import { useChatContext } from "../contexts/ChatContext"
import { db } from "../firebase"

function Chats() {
  const [chats, setChats] = useState([])
  const { currentUser } = useAuthContext()
  const { dispatch } = useChatContext()

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user })
  }

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data())
      })

      return () => {
        unsub()
      }
    }
    currentUser.uid && getChats()
  }, [currentUser.uid])

  return (
    <div>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="flex items-center gap-2 my-2 px-3 py-1 hover:bg-red-900"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img
              className="w-14 h-14 rounded-full object-cover"
              src={chat[1].userInfo.photoURL}
            />
            <div>
              <span className="font-bold text-lg">
                {chat[1].userInfo.displayName}
              </span>
              <p className="opacity-70 text-sm -mt-1">
                {chat[1].lastMessage?.text}
              </p>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Chats
