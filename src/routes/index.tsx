import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Page,
})

function Page() {
  return (
    <h1>Home</h1>
  )
}