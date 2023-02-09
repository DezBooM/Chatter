import { useEffect, useRef } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import { useChatContext } from "../contexts/ChatContext"

function Message({ message }) {
  const { currentUser } = useAuthContext()
  const { data } = useChatContext()

  const ref = useRef(null)

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }, [message])

  return (
    <div
      ref={ref}
      className={`flex ${
        message.senderId === currentUser.uid && "flex-row-reverse"
      } mb-4`}
    >
      <div>
        <img
          className="w-14 h-14 rounded-full object-cover"
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
        />
        <span className="text-xs opacity-80 pl-2">{message.date}</span>
      </div>
      <div
        className={`max-w-[80%] ${
          message.senderId === currentUser.uid ? "mr-5" : "ml-5"
        } ${
          message.senderId === currentUser.uid
            ? "flex justify-end items-center"
            : "flex items-center"
        }`}
      >
        {message.text && (
          <p
            className={`px-5 py-3 my-1 -mt-5 max-w-max ${
              message.senderId === currentUser.uid
                ? "rounded-b-md rounded-tl-md bg-red-700"
                : "rounded-b-md rounded-tr-md bg-green-800"
            } `}
          >
            {message.text}
          </p>
        )}
        {message.image && <img className="w-1/2" src={message.image} />}
      </div>
    </div>
  )
}

export default Message
