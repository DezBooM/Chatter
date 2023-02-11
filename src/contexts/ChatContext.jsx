import { createContext, useContext, useReducer } from "react"
import { useAuthContext } from "./AuthContext"

const ChatContext = createContext()

export function ChatContextProvider({ children }) {
  const { currentUser } = useAuthContext()
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  }

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        }
      case "DELETE_CHAT":
        return {
          user:{},
          chatId: "null"
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChatContext = () => useContext(ChatContext)
