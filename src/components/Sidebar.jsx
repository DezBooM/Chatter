import Chats from "./Chats"
import Navbar from "./Navbar"
import Search from "./Search"

function Sidebar() {
  return (
    <div className="flex-1 bg-red-700">
      <Navbar />
      <Search />
      <Chats />
    </div>
  )
}

export default Sidebar
