import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { signAuthToken, verifyPassword } from '@/lib/auth';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = schema.parse(body);

    const user = await db.user.findUnique({ where: { email: payload.email } });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const valid = await verifyPassword(payload.password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = signAuthToken({ userId: user.id, email: user.email });
    return NextResponse.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    return NextResponse.json({ error: 'Login failed', details: String(error) }, { status: 400 });
  }
}
