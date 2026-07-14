export function formatFrenchDate(date: Date | string) {
  const value = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(value);
}

export function formatCategory(category: string) {
  return category === 'outils-et-pratiques' ? 'Outils & Pratiques' : 'IA en Afrique';
}
