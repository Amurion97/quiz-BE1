import {Router} from 'express'
import flightController from "../controller/flightController";

const flightRouter = Router()
flightRouter.get('', flightController.all);
flightRouter.post('', flightController.save);
flightRouter.put('/:id', flightController.update);
flightRouter.delete('/:id', flightController.delete);

export default flightRouter
