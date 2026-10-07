import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const AUTH_SECRET = process.env.AUTH_SECRET || 'development-secret';

export type AuthTokenPayload = {
  userId: string;
  email: string;
};

export function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signAuthToken(payload: AuthTokenPayload) {
  return jwt.sign(payload, AUTH_SECRET, { expiresIn: '7d' });
}

export function verifyAuthToken(token: string) {
  return jwt.verify(token, AUTH_SECRET) as AuthTokenPayload;
}
