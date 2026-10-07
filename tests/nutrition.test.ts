import { describe, expect, it } from 'vitest';
import { canonicalIngredientName, normalizeIngredientName } from '../src/lib/ingredient-normalization';

describe('ingredient normalization', () => {
  it('normalizes tomato variants', () => {
    expect(normalizeIngredientName('Tomatoes')).toBe('tomato');
    expect(normalizeIngredientName('Tamatar')).toBe('tomato');
    expect(canonicalIngredientName('Tomato')).toBe('tomato');
  });

  it('normalizes coriander variants', () => {
    expect(normalizeIngredientName('Coriander')).toBe('cilantro');
    expect(normalizeIngredientName('Dhania')).toBe('cilantro');
  });

  it('normalizes Indian ingredient aliases', () => {
    expect(normalizeIngredientName('Moong Dal')).toBe('moongdal');
    expect(normalizeIngredientName('Green Chilli')).toBe('greenchilli');
  });
});
