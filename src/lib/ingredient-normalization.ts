export type NutritionValue = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fibre: number;
  sugar: number;
  sodium: number;
};

export type IngredientNutritionInput = {
  ingredient: string;
  quantity: number;
  unit: 'g' | 'kg' | 'ml' | 'pcs';
};

const INGREDIENT_MAP: Record<string, NutritionValue> = {
  tomato: { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fibre: 1.2, sugar: 2.6, sodium: 5 },
  spinach: { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fibre: 2.2, sugar: 0.4, sodium: 79 },
  onion: { calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, fibre: 1.7, sugar: 4.2, sodium: 4 },
  rice: { calories: 130, protein: 2.7, carbs: 28.2, fat: 0.3, fibre: 0.4, sugar: 0.0, sodium: 1 },
  chicken: { calories: 165, protein: 31, carbs: 0, fat: 3.6, fibre: 0, sugar: 0, sodium: 74 },
  potato: { calories: 77, protein: 2, carbs: 17.5, fat: 0.1, fibre: 2.2, sugar: 0.8, sodium: 6 },
  paneer: { calories: 265, protein: 18, carbs: 1.2, fat: 20.8, fibre: 0, sugar: 1.0, sodium: 10 },
  milk: { calories: 42, protein: 3.4, carbs: 5.0, fat: 1.0, fibre: 0, sugar: 5.0, sodium: 44 },
  egg: { calories: 155, protein: 13, carbs: 1.1, fat: 11, fibre: 0, sugar: 1.1, sodium: 142 },
  curd: { calories: 60, protein: 3.5, carbs: 3.6, fat: 3.3, fibre: 0, sugar: 3.6, sodium: 36 },
  moongdal: { calories: 105, protein: 7.5, carbs: 19.1, fat: 0.4, fibre: 7.9, sugar: 0.0, sodium: 11 },
  lentil: { calories: 116, protein: 9, carbs: 20, fat: 0.4, fibre: 8, sugar: 0.0, sodium: 2 },
  ginger: { calories: 80, protein: 1.8, carbs: 17.8, fat: 0.8, fibre: 2.0, sugar: 1.7, sodium: 13 },
  garlic: { calories: 149, protein: 6.4, carbs: 33.1, fat: 0.5, fibre: 2.1, sugar: 1.0, sodium: 17 },
  greenchilli: { calories: 40, protein: 1.9, carbs: 8.9, fat: 0.4, fibre: 1.5, sugar: 2.2, sodium: 7 },
  peas: { calories: 81, protein: 5.4, carbs: 14.5, fat: 0.4, fibre: 5.1, sugar: 5.7, sodium: 5 },
  cilantro: { calories: 22, protein: 2.1, carbs: 3.7, fat: 0.5, fibre: 2.1, sugar: 0.9, sodium: 28 },
};

function toGrams(quantity: number, unit: IngredientNutritionInput['unit']) {
  switch (unit) {
    case 'kg':
      return quantity * 1000;
    case 'ml':
      return quantity;
    case 'pcs':
      return quantity * 50;
    case 'g':
    default:
      return quantity;
  }
}

export function calculateIngredientNutrition({ ingredient, quantity, unit }: IngredientNutritionInput): NutritionValue {
  const key = ingredient.toLowerCase().trim();
  const base = INGREDIENT_MAP[key] ?? INGREDIENT_MAP[key.replace(/s$/, '')] ?? {
    calories: 35,
    protein: 1.4,
    carbs: 6,
    fat: 0.5,
    fibre: 1.5,
    sugar: 1.0,
    sodium: 20,
  };

  const grams = toGrams(quantity, unit);
  const factor = grams / 100;

  return {
    calories: Number((base.calories * factor).toFixed(1)),
    protein: Number((base.protein * factor).toFixed(1)),
    carbs: Number((base.carbs * factor).toFixed(1)),
    fat: Number((base.fat * factor).toFixed(1)),
    fibre: Number((base.fibre * factor).toFixed(1)),
    sugar: Number((base.sugar * factor).toFixed(1)),
    sodium: Number((base.sodium * factor).toFixed(1)),
  };
}

export function calculateRecipeNutrition(ingredients: IngredientNutritionInput[]): NutritionValue {
  return ingredients.reduce<NutritionValue>(
    (sum, ingredient) => {
      const item = calculateIngredientNutrition(ingredient);
      return {
        calories: Number((sum.calories + item.calories).toFixed(1)),
        protein: Number((sum.protein + item.protein).toFixed(1)),
        carbs: Number((sum.carbs + item.carbs).toFixed(1)),
        fat: Number((sum.fat + item.fat).toFixed(1)),
        fibre: Number((sum.fibre + item.fibre).toFixed(1)),
        sugar: Number((sum.sugar + item.sugar).toFixed(1)),
        sodium: Number((sum.sodium + item.sodium).toFixed(1)),
      };
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0, sugar: 0, sodium: 0 },
  );
}
