export type USDAIngredientMatch = {
  ingredient: string;
  fdcId: number | null;
  description: string | null;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  source: 'verified' | 'fallback';
};

const USDA_API_KEY = process.env.USDA_API_KEY;

export async function searchUsdaIngredient(ingredient: string): Promise<USDAIngredientMatch> {
  const normalized = ingredient.trim();

  if (!USDA_API_KEY) {
    return {
      ingredient: normalized,
      fdcId: null,
      description: null,
      calories: null,
      protein: null,
      carbs: null,
      fat: null,
      source: 'fallback',
    };
  }

  const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${USDA_API_KEY}&query=${encodeURIComponent(normalized)}&pageSize=3`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'force-cache',
  });

  if (!response.ok) {
    return {
      ingredient: normalized,
      fdcId: null,
      description: null,
      calories: null,
      protein: null,
      carbs: null,
      fat: null,
      source: 'fallback',
    };
  }

  const data = await response.json();
  const food = data.foods?.[0];

  if (!food) {
    return {
      ingredient: normalized,
      fdcId: null,
      description: null,
      calories: null,
      protein: null,
      carbs: null,
      fat: null,
      source: 'fallback',
    };
  }

  const nutrients = food.foodNutrients ?? [];
  const getNutrientValue = (nutrientName: string) => {
    const match = nutrients.find((nutrient: any) => nutrient.nutrientName?.toLowerCase() === nutrientName.toLowerCase());
    return match?.value ?? null;
  };

  return {
    ingredient: normalized,
    fdcId: food.fdcId ?? null,
    description: food.description ?? null,
    calories: getNutrientValue('Energy'),
    protein: getNutrientValue('Protein'),
    carbs: getNutrientValue('Carbohydrate, by difference'),
    fat: getNutrientValue('Total lipid (fat)'),
    source: 'verified',
  };
}

export async function enrichIngredientWithNutrition(ingredient: string) {
  const match = await searchUsdaIngredient(ingredient);
  return {
    ingredient,
    nutrition: {
      calories: match.calories,
      protein: match.protein,
      carbs: match.carbs,
      fat: match.fat,
      source: match.source,
      fdcId: match.fdcId,
    },
  };
}
