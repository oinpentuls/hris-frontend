import { DataTable } from "@/components/data-table"
import { columns } from "./columns"
import { payments } from "./queries"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

function EmployeeIndexRoute() {
    return (
        <DataTable columns={columns} data={payments}
            actionButton={<Button variant="default"
                size="sm"
                className="ml-2 hidden h-8 lg:flex cursor-pointer">
                    <Plus className="h-4 w-4" />
                    <span>New Employee</span>
                </Button>} />
    )
}

export default EmployeeIndexRoute
