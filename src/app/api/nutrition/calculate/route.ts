import { NextResponse } from 'next/server';
import { z } from 'zod';
import { recipeSeed } from '@/data/seed-data';
import { rankRecipes } from '@/lib/recommendation';

const schema = z.object({
  ingredients: z.array(z.string()),
});

export async function POST(request: Request) {
  try {
    const body = schema.parse(await request.json());
    const inventory = body.ingredients.map((ingredient) => ({
      ingredient,
      quantity: 1,
      unit: 'pcs' as const,
    }));

    const ranked = rankRecipes(recipeSeed, inventory).slice(0, 5);
    return NextResponse.json({ recipes: ranked.map(({ recipe, score, nutrition }) => ({
      id: recipe.id,
      name: recipe.name,
      cuisine: recipe.cuisine,
      mealType: recipe.mealType,
      score,
      nutrition,
    })) });
  } catch (error) {
    return NextResponse.json({ error: 'Recipe matching failed', details: String(error) }, { status: 400 });
  }
}
