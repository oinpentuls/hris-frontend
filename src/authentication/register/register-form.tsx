import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "@tanstack/react-router"
import { useMutation } from "@tanstack/react-query"
import { AlertCircleIcon, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ApiError } from "@/lib/fetch"
import { registerSchema, type RegisterSchemaType } from "./register-schema"
import { register } from "./mutation"
import type { ProblemJson } from "@/lib/problem-json"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

function RegisterForm() {
    const [errors, setError] = useState<string[] | null>(null)

    const form = useForm<RegisterSchemaType>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            companyName: "",
            email: "",
            password: "",
            passwordConfirmation: "",
        },
    })

    const mutation = useMutation({
        mutationFn: register,
        onSuccess: () => {
            toast.success("Registration successful. Redirecting...")
            form.reset()
            form.clearErrors()
            setError(null)
        },
        onError: async (e) => {
            if (e instanceof ApiError) {
                const errorCollection = []
                const body: ProblemJson = await e.response.json()
                if (body.errors) {
                    for (const error of Object.values(body.errors)) {
                        console.log(error)
                        for (const innerError of error) {
                            errorCollection.push(innerError)
                        }
                    }
                }

                setError(errorCollection)
            }

            toast.error("Registration failed. Please try again.")
        },
    })

    function onSubmit(values: RegisterSchemaType) {
        mutation.mutate(values)
    }
    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-6"
                onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Register</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Enter your details to create a new account
                    </p>
                </div>
                <div className="grid gap-6">
                    <div className="alert">
                        {errors && (
                            <Alert variant="destructive">
                                <AlertCircleIcon />
                                <AlertTitle>Registration failed.</AlertTitle>
                                <AlertDescription>
                                    <ul className="list-inside list-disc text-sm">
                                        {errors.map((error, index) => (
                                            <li key={index}>{error}</li>
                                        ))}
                                    </ul>
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>

                    <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company Name <span className="text-destructive">*</span></FormLabel>
                                <FormControl>
                                    <Input placeholder="Company Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />


                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company Email <span className="text-destructive">*</span></FormLabel>
                                <FormControl>
                                    <Input placeholder="m@example.com" autoComplete="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" autoComplete="current-password" placeholder="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="passwordConfirmation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password Confirmation</FormLabel>
                                <FormControl>
                                    <Input type="password" autoComplete="current-password" placeholder="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="cursor-pointer w-full" disabled={mutation.isPending}>
                        Register {mutation.isPending && <Loader2 className="animate-spin" />}
                    </Button>

                    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                        <span className="bg-background text-muted-foreground relative z-10 px-2">
                            Or continue with
                        </span>
                    </div>
                    <Button variant="outline" className="w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                                fill="currentColor"
                            />
                        </svg>
                        Login with GitHub
                    </Button>
                </div>
                <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="underline underline-offset-4">
                        Sign In
                    </Link>
                </div>
            </form>
        </Form >
    )
}

export default RegisterForm