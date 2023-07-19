import {Router} from 'express'
import {auth} from "../../middleware/auth";
import userController from "../../controller/userController";
import {checkRoleAdmin} from '../../middleware/checkRoleAdmin';


const userRouter = Router()

userRouter.post('/', userController.register);
userRouter.post('/login', userController.login);
userRouter.post('/reset-request', userController.passwordResetRequest);
userRouter.post('/otp-check', userController.OTPCheck);
userRouter.post('/reset-password', userController.resetPassword);

userRouter.get('/:id', auth, userController.showUser);
userRouter.put('/password-change', auth, userController.changePassword);

userRouter.get('/', auth, checkRoleAdmin, userController.all);
userRouter.put('/editRole/:id', auth, checkRoleAdmin, userController.updateRoleOfUser)
userRouter.delete('/:id', auth, checkRoleAdmin, userController.delete);

export default userRouter
