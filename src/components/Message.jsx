import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Bot, User, Copy, Check } from 'lucide-react';

import { useState } from 'react';

export default function Message({ message }) {
const [copied, setCopied] = useState(false);

const isUser = message.role === 'user';

async function copyMessage() {
try {
await navigator.clipboard.writeText(message.content || '');
setCopied(true);
setTimeout(() => setCopied(false), 1500);
} catch (error) {
console.error('Impossible de copier le message :', error);
}
}

return (
<div className={"message-row ${isUser ? 'user' : 'assistant'}"}>
<div className={"message-avatar ${isUser ? 'user-avatar' : 'ai-avatar'}"}>
{isUser ? <User size={17} /> : <Bot size={18} />}
</div>

  <div className="message-content">
    <div className="message-author">
      {isUser ? 'Vous' : 'MADARA AI'}
      {!isUser && message.model && (
        <span className="message-model">{message.model}</span>
      )}
    </div>

    <div className="message-text">
      {isUser ? (
        <p>{message.content}</p>
      ) : (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {message.content || ''}
        </ReactMarkdown>
      )}
    </div>

    <button
      type="button"
      className="copy-message"
      onClick={copyMessage}
      aria-label="Copier le message"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      <span>{copied ? 'Copié' : 'Copier'}</span>
    </button>
  </div>
</div>

);
}