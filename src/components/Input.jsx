import { useState } from "react"
import { RiImageAddLine } from "react-icons/ri"
import { useAuthContext } from "../contexts/AuthContext"
import { useChatContext } from "../contexts/ChatContext"
import { v4 as uuid } from "uuid"
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore"
import { db, storage } from "../firebase"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"

function Input() {
  const [text, setText] = useState("")
  const [image, setImage] = useState(null)
  const { currentUser } = useAuthContext()
  const { data } = useChatContext()

  const handleSend = async () => {
    if (image) {
      const storageRef = ref(storage, uuid())

      await uploadBytesResumable(storageRef, image).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: new Date().toLocaleTimeString("sr-RS", {
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                image: downloadURL,
              }),
            })
          } catch (err) {
            console.log(err)
          }
        })
      })
    } else if (text) {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: new Date().toLocaleTimeString("sr-RS", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          }),
        }),
      })

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      })

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      })

      setText("")
      setImage(null)
    }
  }

  const handleKey = (e) => {
    e.key === "Enter" && handleSend()
  }

  return (
    <div className="bg-green-800 h-16 py-4 text-2xl flex items-center px-4 gap-2">
      <input
        className="w-full px-1 bg-transparent outline-none placeholder:text-white placeholder:opacity-80 border-b border-white"
        type="text"
        placeholder="Say Hi!"
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={handleKey}
      />
      <input
        className="hidden"
        type="file"
        id="image"
        accept="image/jpg, image/jpeg, image/png"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <label className="cursor-pointer text-3xl" htmlFor="image">
        <RiImageAddLine />
      </label>
      <button
        className="bg-red-700 hover:bg-red-900 px-2 pt-1 flex items-center rounded-full"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  )
}

export default Input
