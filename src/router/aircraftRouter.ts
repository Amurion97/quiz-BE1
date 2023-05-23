import {Router} from 'express'
import aircraftController from "../controller/aircraftController";

const aircraftRouter = Router()

aircraftRouter.get('/', aircraftController.all);

export default aircraftRouter