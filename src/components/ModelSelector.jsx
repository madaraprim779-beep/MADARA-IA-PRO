import { Cpu, ChevronDown, Zap, Brain, Sparkles } from 'lucide-react';

const models = [
{
id: 'auto',
name: 'Automatique',
description: 'MADARA choisit le meilleur modèle',
icon: Sparkles
},
{
id: 'fast',
name: 'Rapide',
description: 'Pour les réponses rapides',
icon: Zap
},
{
id: 'balanced',
name: 'Équilibré',
description: 'Pour les conversations générales',
icon: Cpu
},
{
id: 'advanced',
name: 'Avancé',
description: 'Pour les tâches complexes',
icon: Brain
}
];

export default function ModelSelector({ model, onChange }) {
const selected = models.find(item => item.id === model) || models[0];

return (
<div className="model-selector">
<label htmlFor="madara-model">
<selected.icon size={16} />
</label>

  <select
    id="madara-model"
    value={selected.id}
    onChange={event => onChange(event.target.value)}
    aria-label="Choisir le mode IA"
  >
    {models.map(item => (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    ))}
  </select>

  <ChevronDown size={14} className="model-chevron" />
</div>

);
}