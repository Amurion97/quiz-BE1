import { Response } from "express";

export function ok<T>(res: Response, data: T, status: number = 200) {
    return res.status(status).json({
        success: true,
        data,
    });
}

export function fail(res: Response, status: number, message: string) {
    return res.status(status).json({
        success: false,
        message,
    });
}
