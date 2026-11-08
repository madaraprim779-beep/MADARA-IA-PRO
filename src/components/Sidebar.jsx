import { useState } from 'react';
import {
Plus,
Search,
MessageSquare,
Settings,
PanelLeftClose,
PanelLeftOpen,
Sparkles
} from 'lucide-react';

export default function Sidebar({
chats = [],
activeChat,
onNewChat,
onSelectChat,
isOpen = true,
onToggle
}) {
const [search, setSearch] = useState('');

const filteredChats = chats.filter(chat =>
(chat.title || 'Nouvelle conversation')
.toLowerCase()
.includes(search.toLowerCase())
);

if (!isOpen) {
return (
<button
type="button"
className="sidebar-reopen"
onClick={onToggle}
aria-label="Ouvrir le menu"
>
<PanelLeftOpen size={19} />
</button>
);
}

return (
<aside className="sidebar">
<div className="sidebar-header">
<div className="brand">
<div className="brand-icon">
<Sparkles size={21} />
</div>

      <div>
        <h2>MADARA <span>AI</span></h2>
        <small>PRO INTELLIGENCE</small>
      </div>
    </div>

    <button
      type="button"
      className="icon-button"
      onClick={onToggle}
      aria-label="Fermer le menu"
    >
      <PanelLeftClose size={19} />
    </button>
  </div>

  <button
    type="button"
    className="new-chat-button"
    onClick={onNewChat}
  >
    <Plus size={18} />
    Nouvelle conversation
  </button>

  <div className="sidebar-search">
    <Search size={16} />

    <input
      type="search"
      placeholder="Rechercher une conversation..."
      value={search}
      onChange={event => setSearch(event.target.value)}
    />

    {search && (
      <button
        type="button"
        onClick={() => setSearch('')}
        aria-label="Effacer la recherche"
      >
        ×
      </button>
    )}
  </div>

  <div className="history-section">
    <p className="section-heading">HISTORIQUE</p>

    <div className="chat-history">
      {filteredChats.length > 0 ? (
        filteredChats.map(chat => (
          <button
            type="button"
            key={chat.id}
            className={`history-item ${
              activeChat === chat.id ? 'active' : ''
            }`}
            onClick={() => onSelectChat(chat.id)}
          >
            <MessageSquare size={16} />
            <span>
              {chat.title || 'Nouvelle conversation'}
            </span>
          </button>
        ))
      ) : (
        <p className="empty-history">
          {search
            ? 'Aucune conversation trouvée.'
            : 'Tes conversations apparaîtront ici.'}
        </p>
      )}
    </div>
  </div>

  <div className="sidebar-footer">
    <button
      type="button"
      className="history-item"
      onClick={() => window.dispatchEvent(
        new Event('madara:open-settings')
      )}
    >
      <Settings size={17} />
      <span>Paramètres</span>
    </button>

    <div className="user-profile">
      <div className="user-avatar">
        <Sparkles size={17} />
      </div>

      <div className="user-info">
        <strong>MADARA AI</strong>
        <small>Version PRO</small>
      </div>
    </div>

    <p className="sidebar-version">
      MADARA AI PRO · V1.0
    </p>
  </div>
</aside>

);
}