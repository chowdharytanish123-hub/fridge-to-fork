import { NextResponse } from 'next/server';
import { ingredientCatalog } from '@/lib/ingredient-catalog';

export async function GET() {
  return NextResponse.json({
    count: ingredientCatalog.length,
    ingredients: ingredientCatalog.map((ingredient) => ({
      canonicalName: ingredient.canonicalName,
      displayName: ingredient.displayName,
      aliases: ingredient.aliases,
      category: ingredient.category,
    })),
  });
}
