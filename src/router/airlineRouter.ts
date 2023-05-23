import {Router} from 'express'
import airlineController from "../controller/airlineController";

const airlineRouter = Router()

airlineRouter.get('/', airlineController.all);
airlineRouter.get('/:id', airlineController.one);
airlineRouter.post('/', airlineController.save);
airlineRouter.put('/:id', airlineController.update);
airlineRouter.delete('/:id', airlineController.delete);

export default airlineRouter