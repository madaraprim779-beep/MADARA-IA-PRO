const API_ENDPOINT = '/api/chat';

export async function sendMessage({ messages, model = 'auto' }) {
if (!Array.isArray(messages) || messages.length === 0) {
throw new Error('Aucun message à envoyer.');
}

const response = await fetch(API_ENDPOINT, {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify({
messages: messages.map(message => ({
role: message.role,
content: message.content
})),
mode: model
})
});

const data = await response.json().catch(() => ({}));

if (!response.ok) {
throw new Error(
data.error || "Erreur du serveur : ${response.status}"
);
}

if (!data.content) {
throw new Error('Le serveur IA a renvoyé une réponse vide.');
}

return {
content: data.content,
model: data.model || model
};
}