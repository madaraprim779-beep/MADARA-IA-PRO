export default async function handler(req, res) {
res.setHeader('Cache-Control', 'no-store');

if (req.method !== 'GET') {
return res.status(405).json({
error: 'Méthode non autorisée.'
});
}

try {
const response = await fetch(
'https://openrouter.ai/api/v1/models',
{
headers: {
Authorization: "Bearer ${process.env.OPENROUTER_API_KEY}",
'Content-Type': 'application/json'
}
}
);

if (!response.ok) {
  return res.status(response.status).json({
    error: 'Impossible de récupérer les modèles OpenRouter.'
  });
}

const result = await response.json();

const models = (result.data || []).map(model => ({
  id: model.id,
  name: model.name || model.id,
  contextLength: model.context_length || null,
  pricing: model.pricing || null
}));

return res.status(200).json({
  success: true,
  total: models.length,
  models
});

} catch (error) {
console.error('Models error:', error);

return res.status(500).json({
  error: 'Erreur pendant la récupération des modèles.'
});

}
}