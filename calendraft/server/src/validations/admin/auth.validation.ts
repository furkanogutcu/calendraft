import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.string().email().max(255),
    password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
      message: 'Password to be at least 8 characters long and contain at least one letter and one number',
    }),
  })
  .strict();

export const loginSchema = registerSchema;

export class RegisterPayload extends createZodDto(registerSchema) {}
export class LoginPayload extends createZodDto(loginSchema) {}
