import { z } from 'zod'

export const registerUserRequestSchema = z.object({
    body: z.object({
        firstName: z.string(),
        surname: z.string(),
        email: z.string().email(),
        password: z.string(),
        passwordAgain: z.string()
    })
})
