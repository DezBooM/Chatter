import { useChatContext } from "../contexts/ChatContext"
import Input from "./Input"
import Messages from "./Messages"

function Chat() {
  const { data } = useChatContext()

  return (
    <div className="flex-[3]">
      <div className="bg-green-800 py-4 h-16">
        <h1 className="text-center text-2xl">{data.user?.displayName}</h1>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat
