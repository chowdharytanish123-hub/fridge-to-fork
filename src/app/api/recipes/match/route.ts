import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { verifyAuthToken } from '@/lib/auth';

const inventorySchema = z.object({
  ingredient: z.string().min(2),
  quantity: z.number().nonnegative(),
  unit: z.enum(['g', 'kg', 'ml', 'pcs']),
  expiryDate: z.string().optional(),
  storageLocation: z.string().optional(),
  verified: z.boolean().optional(),
});

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.slice(7);
  const decoded = verifyAuthToken(token);
  const items = await db.inventoryItem.findMany({ where: { userId: decoded.userId } });
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const token = authHeader.slice(7);
    const decoded = verifyAuthToken(token);
    const body = inventorySchema.parse(await request.json());

    const item = await db.inventoryItem.create({
      data: {
        userId: decoded.userId,
        ingredient: body.ingredient,
        quantity: body.quantity,
        unit: body.unit,
        expiryDate: body.expiryDate ? new Date(body.expiryDate) : null,
        storageLocation: body.storageLocation ?? 'Refrigerator',
        verified: body.verified ?? false,
      },
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Inventory update failed', details: String(error) }, { status: 400 });
  }
}
