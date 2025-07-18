import { apiClient } from "@/lib/fetch";
import { queryOptions } from "@tanstack/react-query";

export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  salary: number;
  status: string;
};

export type EmployeeResponse = {
  employees: Employee[];
};

export const getEmployeesQuery = () => {
  return queryOptions({
    queryKey: ["employees"],
    queryFn: async () => {
        const response = await apiClient.get('/employees')
        return response.json()
    },
  });
};
