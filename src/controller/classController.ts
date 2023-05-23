import {Request, Response} from "express";
import classService from "../service/classService";

class ClassController {
    all = async (req: Request, res: Response) => {
        try {
            let classes = await classService.all();
            res.status(201).json({
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
}

export default new ClassController();