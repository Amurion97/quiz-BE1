import {Request, Response} from "express";
import DifficultyService from "../service/difficultyService";

class DifficultyController {
    all = async (req: Request, res: Response) => {
        try {
            let difficulties = await DifficultyService.findAll();
            res.status(201).json({
                success: true,
                data: difficulties
            });
        } catch (e) {
            console.log("error in get all difficulty:", e)
            res.status(500).json({
                message: 'error in get all difficulty',
                success: false
            })
        }
    }

    save = async (req: Request, res: Response) => {
        try {
            await DifficultyService.save(req.body);
            res.status(201).json({
                success: true,
                data: 'Add difficulty success!'
            });
        } catch (e) {
            console.log("error in add difficulty:", e)
            res.status(500).json({
                message: 'error in add difficulty',
                success: false
            })
        }
    }
    update = async (req: Request, res: Response) => {
        try {
            await DifficultyService.update(req.params.id, req.body);
            res.status(201).json({
                success: true,
                data: 'update difficulty success!'
            });
        } catch (e) {
            console.log("error in update row:", e)
            res.status(500).json({
                message: 'error in update difficulty',
                success: false
            })
        }
    }
    delete = async (req: Request, res: Response) => {
        try {
            await DifficultyService.delete(req.params.id);
            res.status(201).json({
                success: true,
                data: 'delete difficulty success!'
            });
        } catch (e) {
            console.log("error in delete row:", e)
            res.status(500).json({
                message: 'error in delete difficulty',
                success: false
            })
        }
    }
}

export default new DifficultyController();
