import * as jwt from 'jsonwebtoken'
import userService from "../service/userService";
import userController from "../controller/userController";
import {User} from "../entity/User";

export const SECRET = '123456'
export const checkLoginWithGoogle = async (req, res, next) => {
    let payload = jwt.decode(req.body['credential']);
    let email = payload.email;
    if (email) {
        let user = await userService.oneByEmail(email);
        if (user) {
            return next();
        } else {
            let randomNumber = Math.floor(Math.random() * 1000000).toFixed(0);
            randomNumber = String(randomNumber).padStart(6, '0');
            let role = 3;
            let data = await userService.saveUserByGoogle(email, randomNumber, role);
            let user = await userService.loginCheckByGoogle(email);
            res.status(200).json({
                success: true,
                data: user
            });

        }
    }


}