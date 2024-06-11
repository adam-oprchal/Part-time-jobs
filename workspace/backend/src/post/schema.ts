import z from 'zod';

export const postSchema = z.object({
  jobName: z.string(),
  description: z.string(),
  wage: z.coerce.number(),
  location: z.string(),
  expectedHours: z.coerce.number(),
});

export const paginationSchema = z.object({
  query: z.object({
    page: z.coerce.number(),
    pageSize: z.coerce.number(),
  }),
});

export const postSortingSchema = z.object({
  query: z.object({
    sorting: z.union([
      z.undefined(),
      z.object({
        jobName: z.union([z.literal('asc'), z.literal('desc')]),
      }),
      z.object({
        location: z.union([z.literal('asc'), z.literal('desc')]),
      }),
      z.object({
        wage: z.union([z.literal('asc'), z.literal('desc')]),
      }),
    ]),
  }),
});
