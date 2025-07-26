const API_URL = import.meta.env.VITE_API_URL;

if (API_URL === undefined) {
  throw new Error("VITE_API_URL is not defined");
}

export const endpoint = {
    auth: {
        login: `${API_URL}/login`,
        register: `${API_URL}/api/register`,
        logout: `${API_URL}/logout`,
    },
    employees: {
        list: `${API_URL}/v1/employees`,
        detail: (id: string) => `${API_URL}/v1/employees/${id}`,
        add: `${API_URL}/v1/employees`,
        update: (id: string) => `${API_URL}/v1/employees/${id}`,
        remove: (id: string) => `${API_URL}/v1/employees/${id}`,
    }
}