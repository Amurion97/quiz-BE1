import userService from "../service/userService";
import {Request, Response} from "express";

class UserController {

    register = async (req: Request, res: Response) => {
        try {
            let check = await userService.checkUsedUsername(req.body.username)
            if (!check) {
                await userService.save(req.body);
                await res.status(201).json({
                    success: true,
                    data: req.body.username
                });
            } else {
                await res.status(409).json({
                    success: false,
                    message: 'Used username'
                });
            }
        } catch (e) {
            console.log("error in signup:", e)
            await res.status(500).json({
                message: 'error in signup',
                success: false
            })
        }

    }

    login = async (req: Request, res: Response) => {
        try {
            console.log(req.body)
            let payload = await userService.loginCheck(req.body);
            if (payload) {
                if (payload.isLocked) {
                    res.status(403).json({
                        message: "Locked account",
                        success: false
                    })
                } else {
                    res.status(200).json({
                        success: true,
                        data: payload
                    });
                }

            } else {
                throw new Error("Wrong username or password")
            }
        } catch (e) {
            console.log("error in login:", e)
            res.status(401).json({
                message: e.message,
                success: false
            })
        }


    }
    all = async (req: Request, res: Response) => {
        try {
            let users = await userService.all();
            res.status(201).json({
                success: true,
                data: users
            });
        } catch (e) {
            console.log("error in get all user:", e)
            res.status(500).json({
                message: 'error in get all user',
                success: false
            })
        }
    }
    showUser = async (req: Request, res: Response) => {
        try {
            let userId = req.params.id;
            let user = await userService.one(userId)
            res.status(201).json({
                success: true,
                data: user
            });
        } catch (e) {
            console.log("error in showUser:", e)
            res.status(500).json({
                message: 'error in showUser',
                success: false
            })
        }
    }
    editUser = async (req: Request, res: Response) => {
        try {
            let user = req.body;
            let id = req.params.id
            let newUser = await userService.updateUser(id, user);
            res.status(201).json(newUser);
        } catch (e) {
            console.log("error in editUser:", e)
            res.status(500).json({
                message: 'error in editUser',
                success: false
            })
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            await userService.delete(req.params.id);
            res.status(200).json({
                success: true,
                data: 'delete user success!'
            });
        } catch (e) {
            console.log("error in delete user:", e)
            res.status(500).json({
                message: 'error in delete user',
                success: false
            })
        }
    }
}

export default new UserController();
