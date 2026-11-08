const STORAGE_KEY = 'madara_ai_pro_chats_v1';

export function loadChats() {
try {
const saved = localStorage.getItem(STORAGE_KEY);

if (!saved) return [];

const chats = JSON.parse(saved);

if (!Array.isArray(chats)) return [];

return chats.filter(chat =>
  chat &&
  typeof chat.id === 'string' &&
  Array.isArray(chat.messages)
);

} catch (error) {
console.error('Erreur de lecture des conversations :', error);
return [];
}
}

export function saveChats(chats) {
try {
localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
return true;
} catch (error) {
console.error('Erreur de sauvegarde :', error);
return false;
}
}

export function deleteChat(chatId) {
const chats = loadChats().filter(chat => chat.id !== chatId);
return saveChats(chats);
}

export function clearChats() {
try {
localStorage.removeItem(STORAGE_KEY);
return true;
} catch (error) {
console.error('Erreur de suppression :', error);
return false;
}
}