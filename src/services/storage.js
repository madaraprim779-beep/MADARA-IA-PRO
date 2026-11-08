const STORAGE_KEY = 'madara_ai_pro_chats_v1';

export function loadChats() {
try {
const saved = localStorage.getItem(STORAGE_KEY);

if (!saved) return [];

const chats = JSON.parse(saved);

return Array.isArray(chats) ? chats : [];

} catch (error) {
console.error('Erreur de lecture:', error);
return [];
}
}

export function saveChats(chats) {
try {
localStorage.setItem(
STORAGE_KEY,
JSON.stringify(chats)
);

return true;

} catch (error) {
console.error('Erreur de sauvegarde:', error);
return false;
}
}

export function deleteChat(chatId) {
const chats = loadChats();
const updatedChats = chats.filter(
chat => chat.id !== chatId
);

return saveChats(updatedChats);
}

export function clearChats() {
try {
localStorage.removeItem(STORAGE_KEY);
return true;
} catch (error) {
console.error('Erreur de suppression:', error);
return false;
}
}