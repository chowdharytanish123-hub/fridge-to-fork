import { describe, expect, it } from 'vitest';
import { getExpiringIngredients } from '../src/lib/expiry';

describe('expiry intelligence', () => {
  it('orders items by urgency', () => {
    const items = [
      { ingredient: 'Spinach', expiryDate: '2026-10-08' },
      { ingredient: 'Curd', expiryDate: '2026-10-10' },
      { ingredient: 'Tomato', expiryDate: '2026-10-12' },
    ];

    const expiring = getExpiringIngredients(items);
    expect(expiring[0].ingredient).toBe('Spinach');
    expect(expiring[0].status).toBe('urgent');
  });
});
