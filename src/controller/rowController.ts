import {Request, Response} from "express";
import rowService from "../service/rowService";

class RowController {
    all = async (req: Request, res: Response) => {
        try {
            let rows = await rowService.all();
            res.status(201).json({
                success: true,
                data: rows
            });
        } catch (e) {
            console.log("error in get all row:", e)
            res.status(500).json({
                message: 'error in get all row',
                success: false
            })
        }
    }
}

export default new RowController();
