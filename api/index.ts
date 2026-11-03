import serverless = require('serverless-http');
import { AppDataSource } from '../src/data-source';
import app from '../src/app';

const DB_INIT_TIMEOUT_MS = 15000;

let handler: any;

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
    return Promise.race([
        promise,
        new Promise<T>((_, reject) =>
            setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms)
        )
    ]);
}

async function bootstrap() {
    console.log('[quiz-api] bootstrap start');

    if (!AppDataSource.isInitialized) {
        console.log('[quiz-api] initializing database...');
        try {
            await withTimeout(
                AppDataSource.initialize(),
                DB_INIT_TIMEOUT_MS,
                'database initialization'
            );
            console.log('[quiz-api] database initialized');
        } catch (error) {
            console.error('[quiz-api] database initialization failed:', error);
            throw error;
        }
    } else {
        console.log('[quiz-api] database already initialized');
    }

    if (!handler) {
        console.log('[quiz-api] creating serverless handler');
        handler = serverless(app);
        console.log('[quiz-api] serverless handler created');
    }

    return handler;
}

export default async function (req: any, res: any) {
    console.log('[quiz-api] request received', req.method, req.url);
    try {
        const h = await bootstrap();
        console.log('[quiz-api] invoking handler');
        const result = await h(req, res);
        console.log('[quiz-api] handler finished');
        return result;
    } catch (error) {
        console.error('[quiz-api] request error:', error);
        throw error;
    }
}
