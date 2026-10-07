import { getExpiringIngredients } from './expiry';
import { rankRecipes, type InventoryItem, type Recipe } from './recommendation';

export type MealPlanSlot = {
  day: string;
  meal: 'Breakfast' | 'Lunch' | 'Dinner';
  recipe: Recipe;
};

export function generateCookNowSuggestions(recipes: Recipe[], inventory: InventoryItem[]) {
  const ranked = rankRecipes(recipes, inventory)
    .filter((item) => item.missingCount <= 3)
    .sort((a, b) => {
      const expiryA = getExpiringIngredients(inventory).find((entry) => entry.ingredient === a.recipe.ingredients[0]?.name);
      const expiryB = getExpiringIngredients(inventory).find((entry) => entry.ingredient === b.recipe.ingredients[0]?.name);
      const urgencyA = expiryA ? expiryA.daysRemaining : 999;
      const urgencyB = expiryB ? expiryB.daysRemaining : 999;
      return urgencyA - urgencyB || b.score - a.score;
    })
    .slice(0, 5);

  return ranked.map(({ recipe, score, matchedCount, missingCount, nutrition }) => ({
    id: recipe.id,
    name: recipe.name,
    cuisine: recipe.cuisine,
    mealType: recipe.mealType,
    score,
    matchedCount,
    missingCount,
    nutrition,
    why: `You already have ${matchedCount} of ${recipe.ingredients.length} ingredients and the meal fits your current pantry.`,
  }));
}

export function generateWeeklyMealPlan(recipes: Recipe[], inventory: InventoryItem[]) {
  const expiring = getExpiringIngredients(inventory);
  const ranked = rankRecipes(recipes, inventory);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const meals = ['Breakfast', 'Lunch', 'Dinner'] as const;

  return days.flatMap((day) =>
    meals.map((meal, index) => {
      const recipe = ranked[(index + days.indexOf(day)) % ranked.length]?.recipe ?? recipes[0];
      const urgentMatch = expiring.find((entry) => recipe.ingredients.some((ingredient) => ingredient.name.toLowerCase().includes(entry.ingredient.toLowerCase())));

      return {
        day,
        meal,
        recipe,
        expiryPriority: urgentMatch ? urgentMatch.daysRemaining : null,
      };
    }),
  );
}
