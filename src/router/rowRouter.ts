import {Router} from 'express'
import rowController from "../controller/rowController";

const rowRouter = Router()
rowRouter.get('', rowController.all);

export default rowRouter
