import { z } from 'zod';
import { requiredString } from '../common/required-string.validation';
import { createZodDto } from '@anatine/zod-nestjs';

export const createSchema = z
  .object({
    name: requiredString(),
    price: z.number().min(0).optional(),
  })
  .strict();

export const updateSchema = createSchema
  .partial()
  .extend({
    price: z.union([z.number().min(0).optional(), z.null()]),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field is required!',
  });

export class ServiceCreatePayload extends createZodDto(createSchema) {}
export class ServiceUpdatePayload extends createZodDto(updateSchema) {}
