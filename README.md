import { describe, expect, it } from 'vitest';
import { rankRecipes } from '../src/lib/recommendation';
import { recipeSeed } from '../src/data/seed-data';

describe('recommendation engine', () => {
  it('ranks recipes by available ingredients', () => {
    const inventory = [
      { ingredient: 'spinach', quantity: 200, unit: 'g' },
      { ingredient: 'paneer', quantity: 150, unit: 'g' },
      { ingredient: 'onion', quantity: 80, unit: 'g' },
      { ingredient: 'tomato', quantity: 80, unit: 'g' },
    ];

    const ranked = rankRecipes(recipeSeed, inventory);
    expect(ranked[0].recipe.name).toContain('Spinach');
    expect(ranked[0].score).toBeGreaterThan(0);
  });
});
