import { useState, useRef } from 'react';
import {
Send,
Paperclip,
Image,
Mic,
X
} from 'lucide-react';

export default function ChatInput({ onSend, disabled = false }) {
const [value, setValue] = useState('');
const [file, setFile] = useState(null);
const inputRef = useRef(null);
const fileRef = useRef(null);

function submit(event) {
event.preventDefault();

const message = value.trim();

if (!message || disabled) return;

onSend?.(message, file);

setValue('');
setFile(null);

if (fileRef.current) {
  fileRef.current.value = '';
}

}

return (
<form className="chat-composer" onSubmit={submit}>
{file && (
<div className="attachment-preview">
<span>{file.name}</span>
<button
type="button"
onClick={() => {
setFile(null);
if (fileRef.current) fileRef.current.value = '';
}}
>
<X size={16} />
</button>
</div>
)}

  <textarea
    ref={inputRef}
    value={value}
    onChange={event => setValue(event.target.value)}
    placeholder="Écris ton message à MADARA AI..."
    rows={1}
    disabled={disabled}
    onKeyDown={event => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        submit(event);
      }
    }}
  />

  <input
    ref={fileRef}
    type="file"
    hidden
    accept="image/*,.pdf,.txt,.doc,.docx"
    onChange={event => setFile(event.target.files?.[0] || null)}
  />

  <div className="composer-toolbar">
    <div className="composer-tools">
      <button
        type="button"
        title="Joindre un fichier"
        disabled={disabled}
        onClick={() => fileRef.current?.click()}
      >
        <Paperclip size={18} />
      </button>

      <button
        type="button"
        title="Ajouter une image"
        disabled={disabled}
        onClick={() => {
          if (fileRef.current) {
            fileRef.current.accept = 'image/*';
            fileRef.current.click();
          }
        }}
      >
        <Image size={18} />
      </button>

      <button type="button" title="Voix bientôt disponible" disabled>
        <Mic size={18} />
      </button>
    </div>

    <button
      type="submit"
      className="send-button"
      disabled={!value.trim() || disabled}
      aria-label="Envoyer le message"
    >
      <Send size={19} />
    </button>
  </div>
</form>

);
}