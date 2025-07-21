import RegisterRoute from '@/authentication/register/register-route'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/register')({
  component: RegisterRoute,
})
