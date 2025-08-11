// utils/hash.ts
import { createHash } from 'crypto';

export function encodeMD5LowerCase(s?: string): string {
  if (!s) return '';
  return createHash('md5').update(s, 'utf8').digest('hex').toUpperCase(); // lowercase
  // Nếu cần uppercase:
  // return createHash('md5').update(s, 'utf8').digest('hex').toUpperCase();
}
