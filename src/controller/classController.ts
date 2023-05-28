import {Request, Response} from "express";
import classService from "../service/classService";

class ClassController {
    all = async (req: Request, res: Response) => {
        try {
            let classes = await classService.all();
            res.status(200).json({
                success: true,
                data: classes
            });
        } catch (e) {
            console.log("error in get all classes:", e)
            res.status(500).json({
                success: false,
                message: 'error in get all classes'
            })
        }
    }

    one = async (req: Request, res: Response) => {
        try {
            let aClass = await classService.one(req.params.id);
            res.status(200).json({
                success: true,
                data: aClass
            });
        } catch (e) {
            console.log("error in get a class:", e)
            res.status(500).json({
                message: 'error in get a class',
                success: false
            })
        }
    }
}

export default new ClassController();