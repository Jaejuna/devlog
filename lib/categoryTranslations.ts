const CATEGORY_MAP: Record<string, string> = {
  데이터사이언스: 'Data Science',
  '미분적분학 바이블': 'Calculus Bible',
  회고: 'Retrospective',
  개발: 'Development',
  'LLM 실무': 'LLM in Practice',
}

export function translateCategory(category: string, locale: string): string {
  if (locale !== 'en') return category
  return CATEGORY_MAP[category] ?? category
}
