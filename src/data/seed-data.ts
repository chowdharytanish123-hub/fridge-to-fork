import { calculateRecipeNutrition, type NutritionValue } from './nutrition';
import { canonicalIngredientName } from './ingredient-normalization';

export type InventoryItem = {
  ingredient: string;
  quantity: number;
  unit: 'g' | 'kg' | 'ml' | 'pcs';
  expiryDate?: string;
};

export type Recipe = {
  id: string;
  name: string;
  cuisine: string;
  mealType: string;
  ingredients: Array<{ name: string; quantity: number; unit: 'g' | 'kg' | 'ml' | 'pcs' }>;
  tags?: string[];
  prepTimeMin: number;
  cookTimeMin: number;
};

export function buildInventoryIndex(items: InventoryItem[]) {
  return new Map(items.map((item) => [canonicalIngredientName(item.ingredient), item]));
}

export function getMissingIngredients(recipe: Recipe, inventory: InventoryItem[]) {
  const inventoryMap = buildInventoryIndex(inventory);

  return recipe.ingredients.filter((ingredient) => {
    const canonical = canonicalIngredientName(ingredient.name);
    return !inventoryMap.has(canonical);
  });
}

export function scoreRecipe(recipe: Recipe, inventory: InventoryItem[]) {
  const inventoryMap = buildInventoryIndex(inventory);
  let matchedCount = 0;
  let missingCount = 0;

  for (const ingredient of recipe.ingredients) {
    const canonical = canonicalIngredientName(ingredient.name);
    if (inventoryMap.has(canonical)) {
      matchedCount += 1;
    } else {
      missingCount += 1;
    }
  }

  const nutrition = calculateRecipeNutrition(
    recipe.ingredients.map((ingredient) => ({
      ingredient: ingredient.name,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
    })),
  );

  const score = matchedCount * 25 - missingCount * 15 + nutrition.protein * 3 - recipe.prepTimeMin * 0.1;

  return {
    score: Number(score.toFixed(1)),
    matchedCount,
    missingCount,
    nutrition,
  };
}

export function rankRecipes(recipes: Recipe[], inventory: InventoryItem[]) {
  return recipes
    .map((recipe) => ({ recipe, ...scoreRecipe(recipe, inventory) }))
    .sort((a, b) => b.score - a.score);
}

export function explainRecipe(recipe: Recipe, inventory: InventoryItem[]) {
  const missing = getMissingIngredients(recipe, inventory);
  const available = recipe.ingredients.filter((ingredient) => {
    return buildInventoryIndex(inventory).has(canonicalIngredientName(ingredient.name));
  });

  return {
    summary: `You already have ${available.length} of ${recipe.ingredients.length} ingredients needed.`,
    missing: missing.map((item) => item.name),
    reason: missing.length <= 2 ? 'This recipe fits your current kitchen inventory and would be quick to cook.' : 'This recipe is a strong match but needs a few extra items from your shopping list.',
  };
}
