import { Log, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Log[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            machine_id: "machine-1",
            timestamp: new Date(),
            log_level: "INFO",
            message: "This is a test message",
            request_id: 1
        },

    ]
}

export default async function DemoPage() {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
