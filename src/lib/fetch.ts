export class ApiError extends Error {
    status: number
    response: Response

    constructor(status: number, response: Response) {
        super(response.statusText);
        this.status = status
        this.response = response
    }
}

export const apiClient = {
    get: async (url: string) => {
        const response = await fetch(url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            }
        )

        if(!response.ok) {
            throw new Error(response.statusText)
        }

        return await response
    },
    post: async (url: string, data: unknown) => {
        const response = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(data)
            }
        )

        if(!response.ok) {
            throw new Error(response.statusText)
        }

        return response
    },
    put: async (url: string, data: unknown) => {
        const response = await fetch(url,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(data)
            }
        )

        if(!response.ok) {
            throw new Error(response.statusText)
        }

        return response
    },
    delete: async (url: string) => {
        const response = await fetch(url,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            }
        )

        if(!response.ok) {
            throw new Error(response.statusText)
        }

        return response
    }
}
