import { doc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useChatContext } from "../contexts/ChatContext"
import { db } from "../firebase"
import Message from "./Message"

function Messages() {
  const [messages, setMessages] = useState([])
  const { data } = useChatContext()

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      unsub()
    }
  }, [data.chatId])

  return (
    <div className="h-[calc(100%-128px)] p-2 overflow-y-scroll">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  )
}

export default Messages