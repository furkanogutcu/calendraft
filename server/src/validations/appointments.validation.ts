import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

const createSchema = z
  .object({
    userId: z.number().int().positive(),
    serviceId: z.number().int().positive(),
    startTime: z.string().datetime(),
    endTime: z.string().datetime(),
  })
  .strict();

export class AppointmentCreatePayload extends createZodDto(createSchema) {}
