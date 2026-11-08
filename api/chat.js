const MODEL_MODES = {
auto: 'openrouter/auto',
fast: process.env.OPENROUTER_MODEL_FAST || 'openrouter/auto',
balanced: process.env.OPENROUTER_MODEL_BALANCED || 'openrouter/auto',
advanced: process.env.OPENROUTER_MODEL_ADVANCED || 'openrouter/auto'
};

export default async function handler(req, res) {
res.setHeader('Cache-Control', 'no-store');

if (req.method !== 'POST') {
return res.status(405).json({
error: 'Méthode non autorisée.'
});
}

const apiKey = process.env.OPENROUTER_API_KEY;

if (!apiKey) {
return res.status(500).json({
error: 'La clé OpenRouter est absente du serveur.'
});
}

try {
const { messages, mode = 'auto' } = req.body || {};

if (!Array.isArray(messages) || messages.length === 0) {
  return res.status(400).json({
    error: 'Aucun message fourni.'
  });
}

if (messages.length > 50) {
  return res.status(400).json({
    error: 'Conversation trop longue.'
  });
}

const validMessages = messages.every(message =>
  ['user', 'assistant'].includes(message.role) &&
  typeof message.content === 'string' &&
  message.content.trim().length > 0 &&
  message.content.length <= 20000
);

if (!validMessages) {
  return res.status(400).json({
    error: 'Format de conversation invalide.'
  });
}

const selectedModel = MODEL_MODES[mode] || MODEL_MODES.auto;

const response = await fetch(
  'https://openrouter.ai/api/v1/chat/completions',
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://madara-ai-pro.vercel.app',
      'X-Title': 'MADARA AI PRO'
    },
    body: JSON.stringify({
      model: selectedModel,
      messages: messages.map(message => ({
        role: message.role,
        content: message.content.trim()
      })),
      temperature: 0.7
    })
  }
);

const data = await response.json();

if (!response.ok) {
  console.error('OpenRouter error:', data);

  return res.status(response.status).json({
    error: data.error?.message || 'Erreur OpenRouter.'
  });
}

const content = data.choices?.[0]?.message?.content;

if (!content || typeof content !== 'string') {
  return res.status(502).json({
    error: 'Aucune réponse exploitable reçue.'
  });
}

return res.status(200).json({
  content,
  model: data.model || selectedModel
});

} catch (error) {
console.error('MADARA AI error:', error);

return res.status(500).json({
  error: 'Erreur interne du serveur MADARA AI.'
});

}
}