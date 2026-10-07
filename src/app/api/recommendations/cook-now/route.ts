import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getExpiringIngredients } from '@/lib/expiry';

const schema = z.object({
  inventory: z.array(
    z.object({
      ingredient: z.string(),
      expiryDate: z.string().optional().nullable(),
      quantity: z.number().optional(),
      unit: z.string().optional(),
    }),
  ),
});

export async function POST(request: Request) {
  try {
    const body = schema.parse(await request.json());
    const items = getExpiringIngredients(body.inventory);
    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json({ error: 'Expiry analysis failed', details: String(error) }, { status: 400 });
  }
}
