import { z } from 'zod'

export const registerAccountRequestSchema = z.object({
    body: z.object({
        firstName: z.string(),
        surname: z.string(),
        email: z.string().email(),
        password: z.string(),
        passwordAgain: z.string()
    })
})

export const getApplicantsOfPostSchema = z.object({
    params: z.object({
        postId: z.string().uuid()
    })
})

export const downloadForeignCvSchema = z.object({
    body: z.object({
        accountId: z.string().uuid(),
    })
})
