import { endpoint } from "@/lib/endpoint"
import { ApiError } from "@/lib/fetch"

export type RegisterPayload = {
    companyName: string
    email: string
    password: string
    passwordConfirmation: string
}

export const register = async (payload: RegisterPayload) => {
    const response = await fetch(endpoint.auth.register, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })

    if(!response.ok) {
        throw new ApiError(response.status, response)
    }

    return response
}