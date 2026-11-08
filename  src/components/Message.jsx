import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Sparkles, User, Copy } from 'lucide-react';

export default function Message({ message }) {
const isAssistant = message.role === 'assistant';

return (
<article className={"message-row ${isAssistant ? 'assistant' : 'user'}"}>
<div className={"message-avatar ${isAssistant ? 'ai-avatar' : 'user-avatar'}"}>
{isAssistant ? <Sparkles size={17} /> : <User size={17} />}
</div>

  <div className="message-content">
    <div className="message-author">
      {isAssistant ? 'MADARA AI' : 'VOUS'}
      {message.model && (
        <span className="message-model">{message.model}</span>
      )}
    </div>

    <div className="message-text">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ children, className, ...props }) {
            const isBlock = className?.includes('language-');

            return isBlock ? (
              <pre className="code-block">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className="inline-code" {...props}>
                {children}
              </code>
            );
          }
        }}
      >
        {message.content || ''}
      </ReactMarkdown>
    </div>
  </div>
</article>

);
}