export type IngredientCatalogEntry = {
  canonicalName: string;
  displayName: string;
  aliases: string[];
  category: string;
  defaultUnit: 'g' | 'kg' | 'ml' | 'pcs';
  cuisineContext?: string[];
};

export const ingredientCatalog: IngredientCatalogEntry[] = [
  { canonicalName: 'tomato', displayName: 'Tomato', aliases: ['tomato', 'tomatoes', 'tamatar'], category: 'vegetable', defaultUnit: 'pcs' },
  { canonicalName: 'spinach', displayName: 'Spinach', aliases: ['spinach', 'palak'], category: 'leafy-green', defaultUnit: 'g' },
  { canonicalName: 'onion', displayName: 'Onion', aliases: ['onion', 'onions', 'pyaz'], category: 'vegetable', defaultUnit: 'pcs' },
  { canonicalName: 'garlic', displayName: 'Garlic', aliases: ['garlic', 'lahsun'], category: 'aromatics', defaultUnit: 'clove' as any },
  { canonicalName: 'ginger', displayName: 'Ginger', aliases: ['ginger', 'adrak'], category: 'aromatics', defaultUnit: 'g' },
  { canonicalName: 'greenchilli', displayName: 'Green chilli', aliases: ['green chilli', 'greenchilli', 'hari mirch'], category: 'vegetable', defaultUnit: 'pcs' },
  { canonicalName: 'paneer', displayName: 'Paneer', aliases: ['paneer', 'indian cottage cheese'], category: 'dairy', defaultUnit: 'g' },
  { canonicalName: 'curd', displayName: 'Curd', aliases: ['curd', 'yogurt', 'dahi'], category: 'dairy', defaultUnit: 'g' },
  { canonicalName: 'milk', displayName: 'Milk', aliases: ['milk', 'doodh'], category: 'dairy', defaultUnit: 'ml' },
  { canonicalName: 'egg', displayName: 'Egg', aliases: ['egg', 'eggs'], category: 'protein', defaultUnit: 'pcs' },
  { canonicalName: 'chicken', displayName: 'Chicken', aliases: ['chicken', 'murgh'], category: 'protein', defaultUnit: 'g' },
  { canonicalName: 'fish', displayName: 'Fish', aliases: ['fish', 'machli'], category: 'protein', defaultUnit: 'g' },
  { canonicalName: 'rice', displayName: 'Rice', aliases: ['rice', 'chawal'], category: 'grain', defaultUnit: 'g' },
  { canonicalName: 'moongdal', displayName: 'Moong dal', aliases: ['moong dal', 'moongdal', 'mung dal'], category: 'pulse', defaultUnit: 'g' },
  { canonicalName: 'lentil', displayName: 'Lentil', aliases: ['lentil', 'lentils', 'dal'], category: 'pulse', defaultUnit: 'g' },
  { canonicalName: 'potato', displayName: 'Potato', aliases: ['potato', 'aloo'], category: 'vegetable', defaultUnit: 'pcs' },
  { canonicalName: 'peas', displayName: 'Peas', aliases: ['peas', 'matar'], category: 'vegetable', defaultUnit: 'g' },
  { canonicalName: 'cilantro', displayName: 'Cilantro', aliases: ['cilantro', 'coriander', 'dhania'], category: 'herb', defaultUnit: 'g' },
  { canonicalName: 'mustardoil', displayName: 'Mustard oil', aliases: ['mustard oil', 'sarson tel'], category: 'oil', defaultUnit: 'ml' },
  { canonicalName: 'ghee', displayName: 'Ghee', aliases: ['ghee', 'clarified butter'], category: 'fat', defaultUnit: 'ml' },
];

export function lookupCanonicalIngredient(value: string): string {
  const normalized = value.trim().toLowerCase();

  for (const entry of ingredientCatalog) {
    if (entry.canonicalName === normalized) return entry.canonicalName;
    if (entry.aliases.some((alias) => alias.toLowerCase() === normalized)) return entry.canonicalName;
  }

  return normalized.replace(/s$/, '');
}

export function getIngredientCatalogEntry(value: string): IngredientCatalogEntry | undefined {
  const canonical = lookupCanonicalIngredient(value);
  return ingredientCatalog.find((entry) => entry.canonicalName === canonical);
}
