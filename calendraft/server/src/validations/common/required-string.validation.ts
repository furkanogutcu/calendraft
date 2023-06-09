import { z } from 'zod';

export const requiredString = ({ max }: { max?: number } = {}) =>
  z
    .string()
    .nonempty()
    .max(max || Infinity)
    .refine((val) => val.trim() === val, {
      message: `String cannot start or end with whitespace characters`,
    });
