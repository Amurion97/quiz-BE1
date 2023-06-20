import {Request, Response} from "express";
import questionService from "../service/questionService";


class QuestionController {
    all = async (req: Request, res: Response) => {
        try {
            let questions = await questionService.all(req.query)
            res.status(201).json({
                data: questions,
                success: true
            });
        } catch (e) {
            console.log("error in show all questions:", e)
            res.status(500).json({
                message: "get questions failed",
                success: false
            })
        }
    }

    one = async (req: Request, res: Response) => {
        try {
            let question = await questionService.one(req.params.id);
            res.status(200).json({
                success: true,
                data: question
            });
        } catch (e) {
            console.log("error in get one question:", e)
            res.status(500).json({
                message: 'error in get one question',
                success: false
            })
        }
    }
    save = async (req: Request, res: Response) => {
        try {
            console.log(req.body)
            let question = await questionService.save(req.body);
            if (question) {
                res.status(201).json({
                    success: true,
                    data: 'Add question success!'
                });
            } else {
                res.status(409).json({
                    success: false,
                    message: 'Duplicated question content'
                });
            }

        } catch (e) {
            console.log("error in add question:", e)
            res.status(500).json({
                message: 'error in add question',
                success: false
            })
        }
    }
    update = async (req: Request, res: Response) => {
        try {
            console.log("update question:", req.body)
            await questionService.update(req.params.id, req.body);
            res.status(200).json({
                success: true,
                data: 'update question success!'
            });
        } catch (e) {
            console.log("error in update question:", e)
            res.status(500).json({
                message: 'error in update question',
                success: false
            })
        }
    }
    delete = async (req: Request, res: Response) => {
        try {
            await questionService.delete(req.params.id);
            res.status(200).json({
                success: true,
                data: 'delete question success!'
            });
        } catch (e) {
            console.log("error in delete question:", e)
            res.status(500).json({
                message: 'error in delete question',
                success: false
            })
        }
    }
}

export default new QuestionController();
