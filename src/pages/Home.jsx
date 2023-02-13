import Chat from "../components/Chat"
import Sidebar from "../components/Sidebar"

function Home() {
  return (
    <div className="min-h-screen sm:flex">
      <Sidebar />
      <Chat />
    </div>
  )
}

export default Home
