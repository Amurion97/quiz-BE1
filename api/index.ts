import { AppDataSource } from '../src/data-source';
import app from '../src/app';

export default async function handler(req: any, res: any) {
    console.log('[quiz-api] request received', req.method, req.url);

    try {
        if (!AppDataSource.isInitialized) {
            console.log('[quiz-api] initializing database...');
            await AppDataSource.initialize();
            console.log('[quiz-api] database initialized');
        } else {
            console.log('[quiz-api] database already initialized');
        }

        await new Promise<void>((resolve, reject) => {
            res.on('finish', resolve);
            res.on('error', reject);
            app(req, res, (err: any) => {
                if (err) reject(err);
            });
        });

        console.log('[quiz-api] response finished');
    } catch (error) {
        console.error('[quiz-api] request error:', error);
        if (!res.headersSent) {
            res.status(500).json({ success: false, message: (error as Error).message || 'Internal error' });
        }
        throw error;
    }
}
