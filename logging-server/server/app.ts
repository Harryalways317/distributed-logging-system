import express, { Express, Request, Response } from "express";
const bodyParser = require('body-parser')
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";



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

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});