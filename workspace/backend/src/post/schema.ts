import z from 'zod';

export const postSchema = z.object({
    description: z.string(),
    wage: z.coerce.number(),
    location: z.string(),
    expectedHours: z.coerce.number(),
});

export const paginationSchema = z.object({
    query: z.object({
        page: z.coerce.number(),
        pageSize: z.coerce.number(),
    })
})
