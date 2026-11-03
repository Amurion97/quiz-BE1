import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');
import router from "./router/router";
import { mountSwagger } from "./swagger";
import { allowedDomains } from "./config";
import { AppDataSource } from "./data-source";
import userService from "./service/userService";

const corsOriginCheckFunction = (origin, callback) => {
    // bypass the requests with no origin (like curl requests, mobile apps, etc )
    if (!origin) return callback(null, true);

    if (allowedDomains.indexOf(origin) === -1) {
        let msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
    }
    return callback(null, true);
}

const corsOptions = {
    origin: corsOriginCheckFunction
}

let dbInitPromise: Promise<void> | null = null;

async function ensureDatabase() {
    if (AppDataSource.isInitialized) {
        return;
    }
    if (!dbInitPromise) {
        dbInitPromise = AppDataSource.initialize().then(async () => {
            console.log('[quiz-api] database initialized');
            await userService.resetAdmin();
            await userService.resetDefaultTeacher();
        }).catch((error) => {
            console.error('[quiz-api] database initialization failed:', error);
            throw error;
        });
    }
    return dbInitPromise;
}

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
    try {
        await ensureDatabase();
        next();
    } catch (error) {
        next(error);
    }
});

mountSwagger(app);
app.use('', router);

app.use((err, req, res, next) => {
    console.error('[express] error:', err);
    if (!res.headersSent) {
        res.status(500).json({ success: false, message: err.message || 'Internal error' });
    }
});

export default app;
