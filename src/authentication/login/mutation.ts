import { endpoint } from "@/lib/endpoint"
import { ApiError } from "@/lib/fetch"

export type LoginPayload = {
    email: string,
    password: string
}

export const login = async (payload: LoginPayload) => {
    const response =  await fetch(endpoint.auth.login, {
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