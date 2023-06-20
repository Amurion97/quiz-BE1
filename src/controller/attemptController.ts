import {Request, Response} from "express";
import attemptService from "../service/attemptService";

class AttemptController {
    allByTest = async (req: Request, res: Response) => {
        try {
            let attempts = await attemptService.findAllByTest(req.params.id);
            res.status(201).json({
                success: true,
                data: attempts
            });
        } catch (e) {
            console.log("error in get all attempt by test:", e)
            res.status(500).json({
                message: 'error in get all attempt by test',
                success: false
            })
        }
    }

    allByUser = async (req: Request, res: Response) => {
        try {
            console.log("userid:", req['decode'].id)
            let attempts = await attemptService.findAllByUser(req['decode'].id);
            res.status(201).json({
                success: true,
                data: attempts
            });
        } catch (e) {
            console.log("error in get all attempt by user:", e)
            res.status(500).json({
                message: 'error in get all attempt by user',
                success: false
            })
        }
    }

    save = async (req: Request, res: Response) => {
        try {
            req.body.user = req['decode'].id;
            await attemptService.save(req.body);
            res.status(201).json({
                success: true,
                data: 'Add attempt success!'
            });
        } catch (e) {
            console.log("error in add attempt:", e)
            res.status(500).json({
                message: 'error in add attempt',
                success: false
            })
        }
    }

}

export default new AttemptController();
