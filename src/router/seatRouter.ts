import {Router} from 'express'
import seatController from "../controller/seatController";

const seatRouter = Router()
seatRouter.get('', seatController.all);

export default seatRouter
