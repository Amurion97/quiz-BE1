import serverless = require('serverless-http');
import { AppDataSource } from '../src/data-source';
import app from '../src/app';

let handler: any;

async function bootstrap() {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    if (!handler) {
        handler = serverless(app);
    }
    return handler;
}

export default async function (req: any, res: any) {
    const h = await bootstrap();
    return h(req, res);
}
