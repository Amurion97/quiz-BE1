import {fail} from "../utils/responseHelper";

export const checkRoleAdmin = (req, res, next) => {
    if (req.decode.role === 1) {
        next()
    } else {
        return fail(res, 401, 'You must be an administrator');
    }
}