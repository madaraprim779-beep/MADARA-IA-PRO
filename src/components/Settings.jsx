import { useState } from 'react';
import {
Settings,
Moon,
Globe,
Cpu,
Trash2,
X,
Shield,
Sparkles
} from 'lucide-react';

export default function SettingsPanel({ onClose, onClearHistory }) {
const [language, setLanguage] = useState('fr');
const [theme, setTheme] = useState('dark');
const [model, setModel] = useState('auto');

return (
<div className="settings-overlay">
<section className="settings-panel">

    <header className="settings-header">
      <div>
        <Settings size={20} />
        <h2>Paramètres</h2>
      </div>

      <button onClick={onClose} aria-label="Fermer">
        <X size={20} />
      </button>
    </header>

    <div className="settings-content">

      <div className="settings-group">
        <h3><Globe size={17} /> Langue</h3>
        <select
          value={language}
          onChange={event => setLanguage(event.target.value)}
        >
          <option value="fr">Français</option>
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="pt">Português</option>
        </select>
      </div>

      <div className="settings-group">
        <h3><Moon size={17} /> Apparence</h3>
        <select
          value={theme}
          onChange={event => setTheme(event.target.value)}
        >
          <option value="dark">Noir cosmique</option>
          <option value="red">Rouge néon</option>
          <option value="light">Clair</option>
        </select>
      </div>

      <div className="settings-group">
        <h3><Cpu size={17} /> Modèle IA</h3>
        <select
          value={model}
          onChange={event => setModel(event.target.value)}
        >
          <option value="auto">Automatique</option>
          <option value="fast">Rapide</option>
          <option value="balanced">Équilibré</option>
          <option value="advanced">Avancé</option>
        </select>
      </div>

      <div className="settings-group">
        <h3><Shield size={17} /> Confidentialité</h3>
        <p>
          Les conversations sont conservées localement
          sur cet appareil.
        </p>
      </div>

      <div className="settings-group danger-zone">
        <h3><Trash2 size={17} /> Historique</h3>
        <button
          className="delete-history-button"
          onClick={onClearHistory}
        >
          Supprimer toutes les conversations
        </button>
      </div>

    </div>

    <footer className="settings-footer">
      <Sparkles size={15} />
      MADARA AI PRO · VERSION 1.0
    </footer>

  </section>
</div>

);
}