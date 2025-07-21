import z from "zod"

export const loginSchema = z.object({
    email: z.email().min(1, {message: "Email is required"}),
    password: z.string().min(1, {message: "Password is required"})
})

export type LoginSchemaType = z.infer<typeof loginSchema>