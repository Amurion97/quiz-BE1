import {Request, Response} from "express";
import TagService from "../service/tagService";

class TagController {
    all = async (req: Request, res: Response) => {
        try {
            let tags = await TagService.findAll();
            console.log(tags)
            res.status(201).json({
                success: true,
                data: tags
            });
        } catch (e) {
            console.log("error in get all tag:", e)
            res.status(500).json({
                message: 'error in get all tag',
                success: false
            })
        }
    }

    save = async (req: Request, res: Response) => {
        try {
            await TagService.save(req.body);
            res.status(201).json({
                success: true,
                data: 'Add tag success!'
            });
        } catch (e) {
            console.log("error in add tag:", e)
            res.status(500).json({
                message: 'error in add tag',
                success: false
            })
        }
    }
    update = async (req: Request, res: Response) => {
        try {
            await TagService.update(req.params.id, req.body);
            res.status(201).json({
                success: true,
                data: 'update tag success!'
            });
        } catch (e) {
            console.log("error in update row:", e)
            res.status(500).json({
                message: 'error in update tag',
                success: false
            })
        }
    }
    delete = async (req: Request, res: Response) => {
        try {
            await TagService.delete(req.params.id);
            res.status(201).json({
                success: true,
                data: 'delete tag success!'
            });
        } catch (e) {
            console.log("error in delete row:", e)
            res.status(500).json({
                message: 'error in delete tag',
                success: false
            })
        }
    }
}

export default new TagController();
