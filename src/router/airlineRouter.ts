import {Router} from 'express'
import airlineController from "../controller/airlineController";

const airlineRouter = Router()

airlineRouter.get('/', airlineController.all);

export default airlineRouter