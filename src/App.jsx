import { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Chat from './components/Chat.jsx';
import './style.css';

export default function App() {
const [chats, setChats] = useState([]);
const [activeChat, setActiveChat] = useState(null);
const [sidebarOpen, setSidebarOpen] = useState(true);

function createChat() {
const chat = {
id: crypto.randomUUID(),
title: 'Nouvelle conversation',
messages: [],
createdAt: new Date().toISOString()
};

setChats(previous => [chat, ...previous]);
setActiveChat(chat.id);

}

function updateChat(id, messages) {
setChats(previous =>
previous.map(chat =>
chat.id === id
? {
...chat,
messages,
title: messages[0]?.content?.slice(0, 40) || chat.title
}
: chat
)
);
}

const currentChat = chats.find(chat => chat.id === activeChat);

return (
<div className="app-shell">
<div className="cosmic-background" aria-hidden="true" />

  <Sidebar
    chats={chats}
    activeChat={activeChat}
    onNewChat={createChat}
    onSelectChat={setActiveChat}
    isOpen={sidebarOpen}
    onToggle={() => setSidebarOpen(!sidebarOpen)}
  />

  <main className="main-content">
    <Chat
      chat={currentChat}
      onNewChat={createChat}
      onUpdateChat={updateChat}
    />
  </main>
</div>

);
}