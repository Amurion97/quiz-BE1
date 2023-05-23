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
}

export default new RoleController();
