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
      className={`flex items-start ${
        message.senderId === currentUser.uid && "flex-row-reverse"
      }`}
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
        <span className="text-xs opacity-80 pl-2">
          {message.date.split(" ")[1]}
        </span>
      </div>
      <div
        className={`max-w-[60%] sm:max-w-[80%] ${
          message.senderId === currentUser.uid
            ? "mr-3 flex flex-col justify-center items-end"
            : "ml-3 flex flex-col justify-center"
        }`}
      >
        {message.text && (
          <p
            className={`leading-tight sm:leading-normal text-sm sm:text-base px-3 pt-2 pb-1 mt-2 max-w-max ${
              message.senderId === currentUser.uid
                ? "rounded-b-md rounded-tl-md bg-red-700"
                : "rounded-b-md rounded-tr-md bg-green-900"
            } `}
          >
            {message.text}
          </p>
        )}
        {message.image && (
          <img className="w-2/3 sm:w-1/2 rounded-md" src={message.image} />
        )}
      </div>
    </div>
  )
}

export default Message
