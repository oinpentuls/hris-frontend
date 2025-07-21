import z from "zod";

export const registerSchema = z.object({
    companyName: z.string().min(1, {message: "Company name is required"}),
    email: z.email().min(1, {message: "Company email is required"}),
    password: z.string().min(1, {message: "Password is required"}),
    passwordConfirmation: z.string().min(1, {message: "Password confirmation is required"})
}).refine(data => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"]
})

export type RegisterSchemaType = z.infer<typeof registerSchema>