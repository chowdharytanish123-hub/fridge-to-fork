import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { hashPassword, signAuthToken } from '@/lib/auth';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = schema.parse(body);

    const existing = await db.user.findUnique({ where: { email: payload.email } });
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const user = await db.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        passwordHash: await hashPassword(payload.password),
      },
    });

    const token = signAuthToken({ userId: user.id, email: user.email });

    return NextResponse.json({ token, user: { id: user.id, name: user.name, email: user.email } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Signup failed', details: String(error) }, { status: 400 });
  }
}
