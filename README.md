import { describe, expect, it } from 'vitest';
import { aggregateShoppingList } from '../src/lib/shopping-list';

describe('shopping list aggregation', () => {
  it('merges duplicate ingredients and respects current stock', () => {
    const required = [
      { ingredient: 'Onion', quantity: 2, unit: 'pcs' },
      { ingredient: 'Onion', quantity: 3, unit: 'pcs' },
      { ingredient: 'Tomato', quantity: 2, unit: 'pcs' },
    ];

    const inventory = [
      { ingredient: 'Onion', quantity: 2, unit: 'pcs' },
    ];

    const aggregated = aggregateShoppingList(required, inventory);
    expect(aggregated).toEqual([
      { ingredient: 'Onion', quantity: 3, unit: 'pcs' },
      { ingredient: 'Tomato', quantity: 2, unit: 'pcs' },
    ]);
  });
});
