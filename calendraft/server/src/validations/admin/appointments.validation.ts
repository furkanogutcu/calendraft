import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

const updateSchema = z
  .object({
    startTime: z.string().datetime().optional(),
    endTime: z.string().datetime().optional(),
  })
  .strict();

export class AppointmentUpdatePayload extends createZodDto(updateSchema) {}
