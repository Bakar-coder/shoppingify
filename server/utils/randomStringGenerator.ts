import { randomBytes } from 'crypto';
export const randStr = randomBytes(12).toString('hex');