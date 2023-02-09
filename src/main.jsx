import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { AuthContextProvider } from "./contexts/AuthContext"
import { ChatContextProvider } from "./contexts/ChatContext"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChatContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChatContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
