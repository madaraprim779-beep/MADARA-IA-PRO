export default async function handler(req, res) {
res.setHeader('Cache-Control', 'no-store');

if (req.method !== 'GET') {
return res.status(405).json({
success: false,
error: 'Méthode non autorisée.'
});
}

const apiConfigured = Boolean(
process.env.OPENROUTER_API_KEY
);

return res.status(200).json({
success: true,
application: 'MADARA AI PRO',
version: '1.0.0',
server: 'online',
provider: 'OpenRouter',
apiConfigured,
timestamp: new Date().toISOString()
});
}