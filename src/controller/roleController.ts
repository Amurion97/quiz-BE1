import {Request, Response} from "express";
import roleService from "../service/roleService";
import {ok, fail} from "../utils/responseHelper";

class RoleController {
    all = async (req: Request, res: Response) => {
        try {
            let roles = await roleService.findAll();
            return ok(res, roles);
        } catch (e) {
            console.log("error in get all role:", e)
            return fail(res, 500, 'error in get all role');
        }
    }
    save = async (req: Request, res: Response) => {
        try {
            await roleService.save(req.body);
            return ok(res, 'Add role success!', 201);
        } catch (e) {
            console.log("error in add role:", e)
            return fail(res, 500, 'error in add role');
        }
    }
    update = async (req: Request, res: Response) => {
        try {
            await roleService.update(req.params.id, req.body);
            return ok(res, 'update role success!');
        } catch (e) {
            console.log("error in update role:", e)
            return fail(res, 500, 'error in update role');
        }
    }
    delete = async (req: Request, res: Response) => {
        try {
            await roleService.delete(req.params.id);
            return ok(res, 'delete role success!');
        } catch (e) {
            console.log("error in delete role:", e)
            return fail(res, 500, 'error in delete role');
        }
    }
}

export default new RoleController();
