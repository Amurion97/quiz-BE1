import {Router} from 'express'
import userController from "../controller/userController";
import {auth} from "../middleware/auth";

const userRouter = Router()

userRouter.post('/', userController.register);
userRouter.get('/', userController.all);
userRouter.post('/login', userController.login);
// userRouter.get('/:id',auth, userController.showUser);
// userRouter.put('/:id', userController.editUser);
userRouter.get('/profile', auth, userController.showUser);
userRouter.put('/profile', auth, userController.editUser);

export default userRouter
