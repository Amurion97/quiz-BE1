import {Router} from 'express'
import aircraftController from "../controller/aircraftController";

const aircraftRouter = Router()

aircraftRouter.get('/', aircraftController.all);
aircraftRouter.get('/airlines/:id', aircraftController.allOfAnAirline);
aircraftRouter.get('/:id', aircraftController.one);
aircraftRouter.post('/', aircraftController.save);
aircraftRouter.put('/:id', aircraftController.update);
aircraftRouter.delete('/:id', aircraftController.delete);


export default aircraftRouter