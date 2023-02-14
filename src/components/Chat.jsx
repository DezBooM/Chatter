import { useChatContext } from "../contexts/ChatContext"
import Input from "./Input"
import Messages from "./Messages"

function Chat() {
  const { data } = useChatContext()

  return (
    <div className="h-screen flex-[3]">
      <div className="bg-green-900 py-4 h-16">
        <h1 className="text-center text-2xl">
          {data.user?.displayName
            ? data.user?.displayName?.charAt(0).toUpperCase() +
              data.user?.displayName?.slice(1)
            : "Welcome to Chatter"}
        </h1>
      </div>
      {<Messages />}
      <Input />
    </div>
  )
}

export default Chat
