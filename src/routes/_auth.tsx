import MainLayout from '@/layouts/main-layout'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    )
}
