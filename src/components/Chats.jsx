import {
  deleteDoc,
  deleteField,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore"
import { useEffect, useState } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import { useChatContext } from "../contexts/ChatContext"
import { db } from "../firebase"
import { MdDelete } from "react-icons/md"

function Chats() {
  const [chats, setChats] = useState([])
  const { currentUser } = useAuthContext()
  const { dispatch } = useChatContext()
  
  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user })
  }

  const handleDelete = async (user) => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid

    try {
      await updateDoc(doc(db, "chats", combinedId), { messages: [] })
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: deleteField(),
          displayName: deleteField(),
          photoURL: deleteField(),
        },
        [combinedId + ".userInfo"]: deleteField(),
        [combinedId + "lastMessage"]: {
          text: deleteField(),
        },
        [combinedId + "lastMessage"]: deleteField(),
        [combinedId + ".date"]: deleteField(),
        [combinedId]: deleteField(),
      })
      await updateDoc(doc(db, "userChats", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: deleteField(),
          displayName: deleteField(),
          photoURL: deleteField(),
        },
        [combinedId + ".userInfo"]: deleteField(),
        [combinedId + "lastMessage"]: {
          text: deleteField(),
        },
        [combinedId + "lastMessage"]: deleteField(),
        [combinedId + ".date"]: deleteField(),
        [combinedId]: deleteField(),
      })
      await updateDoc(doc(db, "chats", combinedId), { messages: deleteField() })
      await deleteDoc(doc(db, "chats", combinedId))
      dispatch({ type: "REMOVE_MESSAGES_DATA" })
    } catch (err) {
      console.log(err)
    }
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
            className="flex items-center justify-between hover:bg-red-900"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <div className="flex items-center gap-2 my-1 px-3 py-1">
              <img
                className="w-14 h-14 rounded-full object-cover"
                src={chat[1].userInfo?.photoURL}
              />
              <div>
                <span className="font-bold text-lg">
                  {chat[1].userInfo?.displayName &&
                    chat[1].userInfo?.displayName?.charAt(0).toUpperCase() +
                      chat[1].userInfo?.displayName?.slice(1)}
                </span>
                <p className="opacity-70 text-sm -mt-1 truncate w-52 tracking-tighter">
                  {chat[1].lastMessage?.text}
                </p>
              </div>
            </div>
            <div
              className="px-3 text-2xl cursor-pointer"
              onClick={() => handleDelete(chat[1].userInfo)}
            >
              <MdDelete />
            </div>
          </div>
        ))}
    </div>
  )
}

export default Chats
