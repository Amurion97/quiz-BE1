import {Request, Response} from "express";
import AnswerService from "../service/answerService";

class AnswerController {
    save = async (req: Request, res: Response) => {
        try {
            await AnswerService.save(req.body);
            res.status(201).json({
                success: true,
                data: 'Add answer success!'
            });
        } catch (e) {
            console.log("error in add answer:", e)
            res.status(500).json({
                message: 'error in add answer',
                success: false
            })
        }
    }
    update = async (req: Request, res: Response) => {
        try {
            await AnswerService.update(req.params.id, req.body);
            res.status(201).json({
                success: true,
                data: 'update answer success!'
            });
        } catch (e) {
            console.log("error in update row:", e)
            res.status(500).json({
                message: 'error in update answer',
                success: false
            })
        }
    }
    delete = async (req: Request, res: Response) => {
        try {
            await AnswerService.delete(req.params.id);
            res.status(201).json({
                success: true,
                data: 'delete answer success!'
            });
        } catch (e) {
            console.log("error in delete row:", e)
            res.status(500).json({
                message: 'error in delete answer',
                success: false
            })
        }
    }
}

export default new AnswerController();
