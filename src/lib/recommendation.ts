export function normalizeIngredientName(value: string): string {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const aliasMap: Record<string, string> = {
    tomato: 'tomato',
    tomatoes: 'tomato',
    tamatar: 'tomato',
    coriander: 'cilantro',
    cilantro: 'cilantro',
    dhania: 'cilantro',
    spinach: 'spinach',
    palak: 'spinach',
    onion: 'onion',
    onions: 'onion',
    garlic: 'garlic',
    ginger: 'ginger',
    chilli: 'greenchilli',
    green chilli: 'greenchilli',
    greenchilli: 'greenchilli',
    paneer: 'paneer',
    curd: 'curd',
    yogurt: 'curd',
    dahi: 'curd',
    chicken: 'chicken',
    rice: 'rice',
    moong dal: 'moongdal',
    moongdal: 'moongdal',
    lentils: 'lentil',
    dal: 'lentil',
  };

  return aliasMap[normalized] ?? normalized;
}

export function canonicalIngredientName(value: string): string {
  return normalizeIngredientName(value);
}

export function ingredientVariantMatches(left: string, right: string): boolean {
  return normalizeIngredientName(left) === normalizeIngredientName(right);
}
