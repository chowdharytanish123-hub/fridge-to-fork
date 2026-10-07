import { NextResponse } from 'next/server';
import { z } from 'zod';
import { calculateRecipeNutrition } from '@/lib/nutrition';

const schema = z.object({
  ingredients: z.array(
    z.object({
      ingredient: z.string(),
      quantity: z.number(),
      unit: z.enum(['g', 'kg', 'ml', 'pcs']),
    }),
  ),
});

export async function POST(request: Request) {
  try {
    const body = schema.parse(await request.json());
    const nutrition = calculateRecipeNutrition(body.ingredients);
    return NextResponse.json({ nutrition });
  } catch (error) {
    return NextResponse.json({ error: 'Nutrition calculation failed', details: String(error) }, { status: 400 });
  }
}
