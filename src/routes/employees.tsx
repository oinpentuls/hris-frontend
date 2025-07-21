import EmployeeIndexRoute from '@/features/employee/employee-index-route'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/employees')({
  component: EmployeeIndexRoute,
})
