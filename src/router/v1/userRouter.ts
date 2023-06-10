import {Router} from 'express'
import userController from "../../controller/userController";

const userRouter = Router()

userRouter.post('/', userController.register);
userRouter.get('/', userController.all);
userRouter.post('/login', userController.login);
userRouter.get('/:id', userController.showUser);
userRouter.put('/:id', userController.editUser);
userRouter.delete('/:id', userController.delete);

export default userRouter
