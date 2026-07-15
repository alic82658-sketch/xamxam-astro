export function formatFrenchDate(date: Date | string) {
  const value = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(value);
}

export function formatCategory(category: string) {
  return category === 'outils-et-pratiques' ? 'Outils & Pratiques' : 'IA en Afrique';
}

const ACTEUR_CATEGORY_LABELS: Record<string, string> = {
  'outil-ia': 'Outil IA',
  application: 'Application',
  'agence-digitale': 'Agence digitale',
  freelance: 'Freelance',
  formation: 'Formation',
  startup: 'Startup',
  media: 'Média',
};

export function formatActeurCategory(category: string) {
  return ACTEUR_CATEGORY_LABELS[category] ?? category;
}
