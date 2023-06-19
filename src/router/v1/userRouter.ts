import {Router} from 'express'
import {auth} from "../../middleware/auth";
import userController from "../../controller/userController";
import {checkRoleAdmin} from '../../middleware/checkRoleAdmin';
import {checkLoginWithGoogle} from "../../middleware/checkLoginGoogle";
const userRouter = Router()
userRouter.post('/', userController.register);
userRouter.get('/', auth, checkRoleAdmin, userController.all);
userRouter.post('/login', userController.login);
userRouter.post('/loginWithGoogle',checkLoginWithGoogle ,userController.loginWithGoogle);
userRouter.post('/reset-request', userController.passwordResetRequest);
userRouter.post('/otp-check', userController.OTPCheck);
userRouter.post('/reset-password', userController.resetPassword);
userRouter.get('/:id', userController.showUser);
// userRouter.get('/profile', auth, userController.editUser);
// userRouter.put('/profile', auth, userController.editUser);
userRouter.put('/password-change', auth, userController.changePassword);
userRouter.put('/editRole/:id', auth, checkRoleAdmin, userController.updateRoleOfUser)
// userRouter.put('/:id', userController.editUser);

// userRouter.put('/:id', userController.editUser);
userRouter.delete('/:id', auth, checkRoleAdmin, userController.delete);

export default userRouter
