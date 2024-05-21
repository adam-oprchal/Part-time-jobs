import z from 'zod';

export const postSchema = z.object({
    description: z.string(),
    wage: z.coerce.number(),
    location: z.string(),
    expectedHours: z.coerce.number(),
    creatorId: z.string().uuid(),
    });