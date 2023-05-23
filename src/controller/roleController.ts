import {Request, Response} from "express";
import roleService from "../service/roleService";

class RoleController {
    all = async (req: Request, res: Response) => {
        try {
            let roles = await roleService.all();
            res.status(201).json({
                success: true,
                data: roles
            });
        } catch (e) {
            console.log("error in get all role:", e)
            res.status(500).json({
                message: 'error in get all role',
                success: false
            })
        }
    }
    save = async (req: Request, res: Response) => {
        try {
            await roleService.save(req.body);
            res.status(201).json({
                success: true,
                data: 'Add role success!'
            });
        } catch (e) {
            console.log("error in add role:", e)
            res.status(500).json({
                message: 'error in add role',
                success: false
            })
        }
    }
    update = async (req: Request, res: Response) => {
        try {
            await roleService.update(req.params.id, req.body);
            res.status(201).json({
                success: true,
                data: 'update role success!'
            });
        } catch (e) {
            console.log("error in update role:", e)
            res.status(500).json({
                message: 'error in update role',
                success: false
            })
        }
    }
    delete = async (req: Request, res: Response) => {
        try {
            await roleService.delete(req.params.id);
            res.status(201).json({
                success: true,
                data: 'delete role success!'
            });
        } catch (e) {
            console.log("error in delete role:", e)
            res.status(500).json({
                message: 'error in delete role',
                success: false
            })
        }
    }
}

export default new RoleController();
