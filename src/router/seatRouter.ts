import {Router} from 'express'
import userController from "../controller/userController";
import {auth} from "../middleware/auth";
import seatController from "../controller/seatController";

const seatRouter = Router()
seatRouter.get('', seatController.all);

export default seatRouter
