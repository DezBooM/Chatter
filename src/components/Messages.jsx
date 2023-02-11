import { doc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useChatContext } from "../contexts/ChatContext"
import { db } from "../firebase"
import Message from "./Message"

function Messages() {
  const [messages, setMessages] = useState([])
  const { data, dispatch } = useChatContext()
  const navigate = useNavigate()

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      unsub()
    }
  }, [data.chatId])

  useEffect(() => {
    dispatch({ type: "REMOVE_MESSAGES_DATA" })
  }, [navigate])

  return (
    <div className="h-[calc(100%-128px)] p-2 overflow-y-scroll scroll-smooth scrollbar-thin scrollbar-thumb-red-700">
      {messages?.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  )
}

export default Messages
