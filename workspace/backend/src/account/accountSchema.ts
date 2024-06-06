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
        postId: z.string()
    })
})

export const getApplicantsOfAccountPostsSchema = z.object({
    params: z.object({
        id: z.string()
    })
})

export const deleteAccountRequestSchema = z.object({
    params: z.object({
        id: z.string()
    })
})

export const uploadCvSchema = z.object({
    body: z.object({
        fileName: z.string(),
        accountId: z.string(),
    })
})
