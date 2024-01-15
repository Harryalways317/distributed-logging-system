"use client"

import { ColumnDef } from "@tanstack/react-table"


export type Log = {
    id: number,
    machine_id: string,
    timestamp: Date,
    log_level: string,
    message: string,
    request_id: number
}

export const columns: ColumnDef<Log>[] = [
    {
        header: "ID",
        accessorKey: "id",
        // width: 100,
        // disableFilters: true,
    },
    {
        header: "Machine ID",
        accessorKey: "machine_id",
        // width: 200,
        // disableFilters: true,
    },
    {
        header: "Timestamp",
        accessorKey: "timestamp",
        // width: 200,
        // disableFilters: true,
    },
    {
        header: "Log Level",
        accessorKey: "log_level",
        // width: 100,
        // disableFilters: true,
    },
    {
        header: "Message",
        accessorKey: "message",
        // width: 400,
        // disableFilters: true,
    },
    {
        header: "Request ID",
        accessorKey: "request_id",
        // width: 100,
        // disableFilters: true,
    }
]
