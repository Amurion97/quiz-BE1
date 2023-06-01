import {Router} from 'express'
import airportController from "../controller/airportController";

const airportRouter = Router()

airportRouter.get('/', airportController.all);
airportRouter.get('/:id', airportController.one);
airportRouter.post('/', airportController.save);
airportRouter.put('/:id', airportController.update);
airportRouter.delete('/:id', airportController.delete);

export default airportRouter