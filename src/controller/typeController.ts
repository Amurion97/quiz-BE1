import {Request, Response} from "express";
import TypeService from "../service/typeService";

class TypeController {
    all = async (req: Request, res: Response) => {
        try {
            let types = await TypeService.all();
            console.log(types)
            res.status(201).json({
                success: true,
                data: types
            });
        } catch (e) {
            console.log("error in get all type:", e)
            res.status(500).json({
                message: 'error in get all type',
                success: false
            })
        }
    }

    save = async (req: Request, res: Response) => {
        try {
            await TypeService.save(req.body);
            res.status(201).json({
                success: true,
                data: 'Add type success!'
            });
        } catch (e) {
            console.log("error in add type:", e)
            res.status(500).json({
                message: 'error in add type',
                success: false
            })
        }
    }
    update = async (req: Request, res: Response) => {
        try {
            await TypeService.update(req.params.id, req.body);
            res.status(201).json({
                success: true,
                data: 'update type success!'
            });
        } catch (e) {
            console.log("error in update row:", e)
            res.status(500).json({
                message: 'error in update type',
                success: false
            })
        }
    }
    delete = async (req: Request, res: Response) => {
        try {
            await TypeService.delete(req.params.id);
            res.status(201).json({
                success: true,
                data: 'delete type success!'
            });
        } catch (e) {
            console.log("error in delete row:", e)
            res.status(500).json({
                message: 'error in delete type',
                success: false
            })
        }
    }
}

export default new TypeController();
