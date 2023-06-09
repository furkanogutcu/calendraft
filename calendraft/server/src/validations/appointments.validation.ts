import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

const createSchema = z
  .object({
    userId: z.number().int().positive(),
    serviceId: z.number().int().positive(),
    startTime: z.string().datetime(),
    endTime: z.string().datetime(),
  })
  .strict()
  .refine((data) => {
    const startTime = new Date(data.startTime);
    const endTime = new Date(data.endTime);
    return endTime > startTime;
  }, 'EndTime must be greater than startTime');

export class AppointmentCreatePayload extends createZodDto(createSchema) {}
