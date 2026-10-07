import { describe, expect, it } from 'vitest';
import { lookupCanonicalIngredient } from '../src/lib/ingredient-catalog';

describe('ingredient catalog', () => {
  it('resolves Indian aliases to canonical names', () => {
    expect(lookupCanonicalIngredient('Tamatar')).toBe('tomato');
    expect(lookupCanonicalIngredient('Dhania')).toBe('cilantro');
    expect(lookupCanonicalIngredient('Moong Dal')).toBe('moongdal');
    expect(lookupCanonicalIngredient('Hari Mirch')).toBe('greenchilli');
  });
});
