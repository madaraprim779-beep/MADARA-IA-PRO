import { useState } from 'react';
import {
Plus,
Search,
MessageSquare,
Settings,
PanelLeftClose,
PanelLeftOpen,
Sparkles,
Trash2,
X
} from 'lucide-react';

export default function Sidebar({
chats = [],
activeChat,
onNewChat,
onSelectChat,
isOpen,
onToggle
}) {
const [search, setSearch] = useState('');

const filteredChats = chats.filter(chat =>
chat.title.toLowerCase().includes(search.toLowerCase())
);

return (
<>
{!isOpen && (
<button className="sidebar-reopen" onClick={onToggle}>
<PanelLeftOpen size={20} />
</button>
)}

  {isOpen && (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="brand">
          <div className="brand-icon">
            <Sparkles size={22} />
          </div>
          <div>
            <h2>MADARA <span>AI</span></h2>
            <small>PRO INTELLIGENCE</small>
          </div>
        </div>

        <button className="icon-button" onClick={onToggle}>
          <PanelLeftClose size={19} />
        </button>
      </div>

      <button className="new-chat-button" onClick={onNewChat}>
        <Plus size={19} />
        <span>Nouvelle conversation</span>
      </button>

      <div className="sidebar-search">
        <Search size={17} />
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={event => setSearch(event.target.value)}
        />
        {search && (
          <button onClick={() => setSearch('')}>
            <X size={15} />
          </button>
        )}
      </div>

      <div className="history-section">
        <div className="section-heading">
          HISTORIQUE
        </div>

        <div className="chat-history">
          {filteredChats.length > 0 ? (
            filteredChats.map(chat => (
              <button
                key={chat.id}
                className={`history-item ${
                  activeChat === chat.id ? 'active' : ''
                }`}
                onClick={() => onSelectChat(chat.id)}
              >
                <MessageSquare size={16} />
                <span>{chat.title}</span>
              </button>
            ))
          ) : (
            <p className="empty-history">
              {search
                ? 'Aucun résultat.'
                : 'Tes conversations apparaîtront ici.'}
            </p>
          )}
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">M</div>
          <div className="user-info">
            <strong>MADARA USER</strong>
            <small>Compte personnel</small>
          </div>
          <Settings size={19} />
        </div>
        <div className="sidebar-version">
          MADARA AI PRO · V1.0
        </div>
      </div>
    </aside>
  )}
</>

);
}