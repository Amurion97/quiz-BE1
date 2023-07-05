import {Request, Response} from "express";
import questionService from "../service/questionService";
import testDetailService from "../service/testDetailService";


class QuestionController {
    all = async (req: Request, res: Response) => {
        try {
            let questions = await questionService.findAll(req.query)
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
            let question = await questionService.findOne(req.params.id);
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

    checkUsage = async (req: Request, res: Response) => {
        try {
            let usage = await testDetailService.checkQuestionUsage(req.params.id);
            if (usage) {
                res.status(405).json({
                    success: false,
                    // data: 'Question is in use!'
                    message: 'Câu hỏi đang được sử dụng, vui lòng xoá khỏi đề thi để có thể sửa/xoá!'
                });
            } else {
                res.status(200).json({
                    success: true,
                    data: 'question editable and deletable!'
                });

            }
        } catch (e) {
            console.log("error in checking usage of question:", e)
            res.status(500).json({
                message: "error in checking usage of question:",
                success: false
            })
        }
    }
}

export default new QuestionController();
