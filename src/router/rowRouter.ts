import {Router} from 'express'
import rowController from "../controller/rowController";

const rowRouter = Router()
rowRouter.get('', rowController.all);
rowRouter.post('', rowController.save);
rowRouter.put('/:id', rowController.update);
rowRouter.delete('/:id', rowController.delete);

export default rowRouter
