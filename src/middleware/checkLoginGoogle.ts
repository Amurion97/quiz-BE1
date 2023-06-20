import * as jwt from 'jsonwebtoken'
import userService from "../service/userService";

export const SECRET = '123456'
export const checkLoginWithGoogle = async (req, res, next) => {
    let payload = jwt.decode(req.body['credential']);
    let email = payload.email;
    console.log(email)
    if (email) {
        let user = await userService.oneByEmail(email);
        if (user) {
            return next();
        } else {
            res.status(401).json({
                message: 'You must be an administrator'
            })
        }
    }


}