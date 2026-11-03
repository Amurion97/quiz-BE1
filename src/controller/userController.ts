import userService from "../service/userService";
import {Request, Response} from "express";
import {decode} from "punycode";
import * as bcrypt from "bcrypt";
import {ok, fail} from "../utils/responseHelper";

class UserController {

    register = async (req: Request, res: Response) => {
        try {
            let check = await userService.checkUsedEmail(req.body.email)
            if (!check) {
                await userService.save(req.body);
                return ok(res, req.body.email, 201);
            } else {
                return fail(res, 409, 'Used email');
            }
        } catch (e) {
            console.log("error in signup:", e)
            return fail(res, 500, 'error in signup');
        }

    }


    login = async (req: Request, res: Response) => {
        try {
            // console.log("user login:", req.body);
            let payload = await userService.loginCheck(req.body);
            if (payload) {
                if (payload.isLocked) {
                    return fail(res, 403, "Locked account");
                } else {
                    return ok(res, payload);
                }
            } else {
                throw new Error("Wrong email or password")
            }
        } catch (e) {
            console.log("error in login:", e)
            return fail(res, 401, "Wrong email or password");
        }


    }
    all = async (req: Request, res: Response) => {
        try {
            let users = await userService.findAll();
            return ok(res, users, 201);
        } catch (e) {
            console.log("error in get all user:", e)
            return fail(res, 500, 'error in get all user');
        }
    }
    showUser = async (req: Request, res: Response) => {
        try {
            let userId = req.params.id;
            let user = await userService.one(userId)
            return ok(res, user, 201);
        } catch (e) {
            console.log("error in showUser:", e)
            return fail(res, 500, 'error in showUser');
        }
    }

    // editUser = async (req: Request, res: Response) => {
    //     try {
    //         let user = req.body;
    //         let id = req.params.id
    //         let newUser = await userService.updateUser(id, user);
    //         res.status(201).json(newUser);
    //     } catch (e) {
    //         console.log("error in editUser:", e)
    //         res.status(500).json({
    //             message: 'error in editUser',
    //             success: false
    //         })
    //     }
    // }
    changePassword = async (req: Request, res: Response) => {
        try {
            let id = req["decode"]["id"];
            let user = await userService.one(id);
            if (!user) {
                return fail(res, 404, "User not found");
            }
            let match = await bcrypt.compare(req.body.password, user.password);
            if (!match) {
                return fail(res, 401, "Current password is incorrect");
            }
            await userService.updatePassword(id, req.body);
            return ok(res, "Password changed successfully");
        } catch (e) {
            console.log("error in changePassword:", e)
            return fail(res, 500, "Error while changing password");
        }
    }
    updateRoleOfUser = async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            await userService.updateRoleOfUser(id)
            return ok(res, "update role success", 201);
        } catch (e) {
            console.log("error in updateRoleOfUser:", e)
            return fail(res, 500, 'error in updateRoleOfUser');
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            await userService.delete(req.params.id);
            return ok(res, 'delete user success!');
        } catch (e) {
            console.log("error in delete user:", e)
            return fail(res, 500, 'error in delete user');
        }
    }

    passwordResetRequest = async (req: Request, res: Response) => {
        try {
            console.log("password reset request received");
            await userService.passwordResetRequest(req.body.email);
            return ok(res, "If this email is registered, a reset link has been sent");
        } catch (e) {
            console.log("error while password reset:", e)
            return fail(res, 500, "Error while password reset");
        }
    }

    OTPCheck = async (req: Request, res: Response) => {
        try {
            console.log("OTP check received");
            let success = await userService.OTPCheck(req.body.email, req.body.OTP);
            if (success) {
                return ok(res, "OTP correct");
            } else {
                return fail(res, 404, "OTP incorrect or expired");
            }
        } catch (e) {
            console.log("error while password reset:", e)
            return fail(res, 500, "Error while password reset");
        }
    }

    resetPassword = async (req: Request, res: Response) => {
        try {
            console.log("password reset received");
            let success = await userService.resetPassword( req.body);
            if (success) {
                return ok(res, "Password reset");
            } else {
                return fail(res, 404, "OTP incorrect or expired");
            }
        } catch (e) {
            console.log("error while password reset:", e)
            return fail(res, 500, "Error while password reset");
        }
    }
}

export default new UserController();
