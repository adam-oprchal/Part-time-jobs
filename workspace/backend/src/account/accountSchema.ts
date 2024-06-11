import { z } from 'zod';

export const registerAccountRequestSchema = z.object({
  body: z.object({
    firstName: z.string(),
    surname: z.string(),
    email: z.string().email(),
    password: z.string().min(5),
    passwordConfirm: z.string().min(5),
    avatar: z.string().optional(),
    cv: z.any().optional(),
  }),
});

export const loginRequestSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(5),
  }),
});

export const getApplicantsOfPostSchema = z.object({
  params: z.object({
    postId: z.string().uuid(),
  }),
});

export const downloadForeignCvSchema = z.object({
  body: z.object({
    accountId: z.string().uuid(),
    fileName: z.string(),
    fileType: z.string(),
    fileSize: z.number(),
    fileContent: z.any(),
  }),
});

export const uploadCvSchema = z.object({
  body: z.object({
    fileName: z.string(),
    fileType: z.string(),
    fileSize: z.number(),
    fileContent: z.any(),
  }),
});

export const changePasswordRequestSchema = z.object({
  body: z.object({
    oldPassword: z.string(),
    newPassword: z.string().min(5),
    newPasswordConfirm: z.string().min(5),
  }),
});

export const updateAccountRequestSchema = z.object({
  body: z.object({
    firstName: z.string(),
    surname: z.string(),
    email: z.string().email(),
    avatar: z.string().optional(),
    cv: z.any().optional(),
  }),
});
