import {Router} from 'express'
import seatController from "../controller/seatController";

const seatRouter = Router()
seatRouter.get('', seatController.all);
seatRouter.post('', seatController.save);
seatRouter.put('/:id', seatController.update);
seatRouter.delete('/:id', seatController.delete);

export default seatRouter
