import {Router} from 'express'
import userController from "../controller/userController";
import {auth} from "../middleware/auth";

const userRouter = Router()

userRouter.post('/create', userController.register);
userRouter.get('/', userController.all);
userRouter.post('/login', userController.login);
// userRouter.get('/profile', auth, userController.showUser);
userRouter.get('/:id', userController.showUser);
// userRouter.put('/profile', auth, userController.editUser);
userRouter.put('/password-change',auth, userController.changePassword);
// userRouter.put('/:id', userController.editUser);

userRouter.delete('/:id', userController.delete);

export default userRouter
