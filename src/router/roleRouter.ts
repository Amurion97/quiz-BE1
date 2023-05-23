import {Router} from 'express'
import roleController from "../controller/roleController";

const roleRouter = Router()
roleRouter.get('', roleController.all);

export default roleRouter
