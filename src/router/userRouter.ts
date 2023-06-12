import {Router} from 'express'
import userController from "../controller/userController";
import { checkRoleUser } from '../middleware/checkRoleUser';
import { auth } from '../middleware/auth';


const userRouter = Router()
userRouter.post('/', userController.register);
userRouter.get('/', auth, checkRoleUser, userController.all);
userRouter.post('/login', userController.login);
// userRouter.get('/profile', auth, userController.showUser);
userRouter.get('/:id', userController.showUser);
// userRouter.put('/profile', auth, userController.editUser);
userRouter.put('/:id', userController.editUser);
userRouter.delete('/:id', userController.delete);

export default userRouter
