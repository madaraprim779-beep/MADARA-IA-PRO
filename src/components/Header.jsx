import {
Menu,
Plus,
Share2,
MoreHorizontal,
Sparkles
} from 'lucide-react';

export default function Header({
onNewChat,
onToggleSidebar,
onShare
}) {
return (
<header className="app-header">
<div className="header-left">
<button
className="header-icon"
onClick={onToggleSidebar}
aria-label="Ouvrir le menu"
>
<Menu size={20} />
</button>

    <div className="header-brand">
      <Sparkles size={18} />
      <span>MADARA AI</span>
      <small>PRO</small>
    </div>
  </div>

  <div className="header-actions">
    <button
      className="header-action"
      onClick={onNewChat}
      title="Nouvelle conversation"
    >
      <Plus size={18} />
      <span>Nouveau</span>
    </button>

    <button
      className="header-icon"
      onClick={onShare}
      title="Partager"
    >
      <Share2 size={18} />
    </button>

    <button
      className="header-icon"
      title="Plus d'options"
    >
      <MoreHorizontal size={20} />
    </button>
  </div>
</header>

);
}