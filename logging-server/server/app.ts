import express, { Express, Request, Response } from "express";
const bodyParser = require('body-parser')
import dotenv from "dotenv";
import {PrismaClient} from "@prisma/client";
import {Log} from "./models/log.model";



dotenv.config();


const prisma = new PrismaClient();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({ message: 'Distributed logging server' })
})

app.get('/health', (req, res) => {
    res.json({ message: 'Logging Service running fine :)' })
})

async function saveLogtoDB (log : Log) {
    let request_id
    if (isNaN((log.request_id))) {
        request_id = null
    } else {
        request_id = log.request_id
    }
    return prisma.log.create({
        data: {
            message: log.message,
            logLevel: log.log_level,
            timestamp: log.timestamp,
            machineId: log.machine_id,
            requestId: request_id
        }
    })
}

app.post('/log', async (req, res) => {
    // TODO: add validation
    await saveLogtoDB(req.body)
    res.status(201).json(req.body)
})

app.get('/logs/search', async (req : Request, res : Response) => {
        // Search API with query params
        let where_clause:Partial<{
            id: number;
            machineId: string | null;
            timestamp: Date | {};
            logLevel: string | null;
            message: string | {};
            requestId: number | null;
        }> = {}
        if (valid_date_range(req)) {
            if (req.query.from !== undefined && req.query.to !== undefined && typeof req.query.from === 'string' && typeof req.query.to === 'string') {
                where_clause = {
                    timestamp: {
                        gte: new Date(req.query.from),
                        lte: new Date(req.query.to)
                    }
                }
            }
        } else {
            res.status(400).json({ message: 'from and to must both be present or neither be present' }).send()
            return
        }
        if (req.query.machine_id && typeof req.query.machine_id === 'string') {
            where_clause.machineId = req.query.machine_id
        }
        if (req.query.level && typeof req.query.level === 'string') {
            where_clause.logLevel = req.query.level
        }
        if (req.query.message && typeof req.query.message === 'string') {
            where_clause.message = {
                contains: req.query.message,
                mode: 'insensitive'
            }
        }
        if (req.query.request_id && typeof req.query.request_id === 'string') {
            where_clause.requestId = parseInt(req.query.request_id)
        }

        const logs = await prisma.log.findMany({
            where: where_clause
        })
        res.json(logs)
    }
)

function valid_date_range (req : Request) {
    const from_undefined = (req.query.from === undefined)
    const to_undefined = (req.query.to === undefined)
    return from_undefined === to_undefined
}


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});