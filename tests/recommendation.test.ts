import { describe, expect, it } from 'vitest';
import { calculateRecipeNutrition } from '../src/lib/nutrition';

describe('nutrition calculation', () => {
  it('computes deterministic total nutrition from ingredient weights', () => {
    const nutrition = calculateRecipeNutrition([
      { ingredient: 'spinach', quantity: 200, unit: 'g' },
      { ingredient: 'paneer', quantity: 150, unit: 'g' },
      { ingredient: 'tomato', quantity: 80, unit: 'g' },
    ]);

    expect(nutrition.calories).toBeGreaterThan(200);
    expect(nutrition.protein).toBeGreaterThan(20);
    expect(nutrition.carbs).toBeGreaterThan(10);
    expect(nutrition.fat).toBeGreaterThan(10);
  });
});
