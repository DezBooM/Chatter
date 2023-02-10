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
    <div className="h-[calc(100%-128px)] p-2 overflow-y-scroll scroll-smooth scrollbar-thin scrollbar-thumb-red-700">
      {messages.length > 0 ? messages?.map((message) => (
        <Message key={message.id} message={message} />
      )) : <p className="text-center font-bold">Search for users to say Hi! :D</p>}
    </div>
  )
}

export default Messages
