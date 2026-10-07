import { lookupCanonicalIngredient } from './ingredient-catalog';

export type RecipeDraft = {
  id: string;
  name: string;
  alternateNames?: string[];
  cuisine: string;
  mealType: string;
  dietType: string;
  ingredients: Array<{
    name: string;
    quantity: number;
    unit: 'g' | 'kg' | 'ml' | 'pcs';
  }>;
  prepTimeMin: number;
  cookTimeMin: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
};

export function validateRecipeDraft(recipe: RecipeDraft) {
  if (!recipe.name || recipe.name.length < 3) {
    throw new Error('Recipe name must be at least 3 characters long.');
  }

  if (!Array.isArray(recipe.ingredients) || recipe.ingredients.length === 0) {
    throw new Error('Recipe must include at least one ingredient.');
  }

  for (const ingredient of recipe.ingredients) {
    if (!ingredient.name || ingredient.quantity <= 0) {
      throw new Error(`Ingredient ${ingredient.name || 'unknown'} is invalid.`);
    }
    ingredient.name = lookupCanonicalIngredient(ingredient.name);
  }

  return recipe;
}

export function deduplicateRecipeIngredients(recipes: RecipeDraft[]) {
  const map = new Map<string, RecipeDraft>();

  for (const recipe of recipes) {
    const key = recipe.name.trim().toLowerCase();
    if (!map.has(key)) {
      map.set(key, recipe);
    }
  }

  return [...map.values()];
}

export function normalizeRecipeDraft(recipe: RecipeDraft) {
  return {
    ...recipe,
    name: recipe.name.trim(),
    alternateNames: (recipe.alternateNames ?? []).map((name) => name.trim()),
    ingredients: recipe.ingredients.map((ingredient) => ({
      ...ingredient,
      name: lookupCanonicalIngredient(ingredient.name),
    })),
  };
}
