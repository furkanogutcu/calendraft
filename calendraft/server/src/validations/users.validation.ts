import { z } from 'zod';
import { requiredString } from './common/required-string.validation';
import { createZodDto } from '@anatine/zod-nestjs';

const createSchema = z
  .object({
    firstName: requiredString(),
    lastName: requiredString(),
    phoneNumber: z
      .string()
      .transform((val) => val.trim())
      .refine(
        (data) => {
          return /^(?!0)(\+)[1-9][0-9]{1,14}$/.test(data);
        },
        { message: 'Invalid phone number' },
      ),
  })
  .strict();

export class UserCreatePayload extends createZodDto(createSchema) {}
