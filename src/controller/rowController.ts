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

    save = async (req: Request, res: Response) => {
        try {
            await rowService.save(req.body);
            res.status(201).json({
                success: true,
                data: 'Add row success!'
            });
        } catch (e) {
            console.log("error in add row:", e)
            res.status(500).json({
                message: 'error in add row',
                success: false
            })
        }
    }
    update = async (req: Request, res: Response) => {
        try {
            await rowService.update(req.params.id, req.body);
            res.status(201).json({
                success: true,
                data: 'update row success!'
            });
        } catch (e) {
            console.log("error in update row:", e)
            res.status(500).json({
                message: 'error in update row',
                success: false
            })
        }
    }
    delete = async (req: Request, res: Response) => {
        try {
            await rowService.delete(req.params.id);
            res.status(201).json({
                success: true,
                data: 'delete row success!'
            });
        } catch (e) {
            console.log("error in delete row:", e)
            res.status(500).json({
                message: 'error in delete row',
                success: false
            })
        }
    }
}

export default new RowController();
