import { NextResponse } from 'next/server';
import { z } from 'zod';
import { recipeSeed } from '@/data/seed-data';
import { generateCookNowSuggestions } from '@/lib/planner';

const schema = z.object({
  inventory: z.array(
    z.object({
      ingredient: z.string(),
      quantity: z.number().default(1),
      unit: z.enum(['g', 'kg', 'ml', 'pcs']).default('pcs'),
      expiryDate: z.string().optional().nullable(),
    }),
  ),
});

export async function POST(request: Request) {
  try {
    const body = schema.parse(await request.json());
    const suggestions = generateCookNowSuggestions(
      recipeSeed,
      body.inventory.map((item) => ({
        ingredient: item.ingredient,
        quantity: item.quantity,
        unit: item.unit,
        expiryDate: item.expiryDate ?? undefined,
      })),
    );

    return NextResponse.json({ suggestions });
  } catch (error) {
    return NextResponse.json({ error: 'Cook-now recommendation failed', details: String(error) }, { status: 400 });
  }
}
