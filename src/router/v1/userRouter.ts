import {Router} from 'express'
import {auth} from "../../middleware/auth";
import userController from "../../controller/userController";
import { checkRoleUser } from '../../middleware/checkRoleUser';


const userRouter = Router()

userRouter.post('/', userController.register);
userRouter.get('/', auth, checkRoleUser, userController.all);
userRouter.post('/login', userController.login);
userRouter.get('/:id', userController.showUser);
// userRouter.put('/profile', auth, userController.editUser);
userRouter.put('/password-change',auth, userController.changePassword);
// userRouter.put('/:id', userController.editUser);

// userRouter.put('/:id', userController.editUser);
userRouter.delete('/:id', userController.delete);

export default userRouter
