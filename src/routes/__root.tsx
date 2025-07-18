import MainLayout from '@/layouts/main-layout'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
    component: () => (
        <MainLayout>
            <Outlet />
            <TanStackRouterDevtools />
        </MainLayout>
    ),
})