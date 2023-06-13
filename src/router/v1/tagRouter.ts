import {Router} from 'express'
import tagController from "../../controller/tagController";


const tagRouter = Router()
tagRouter.get('', tagController.all);
tagRouter.post('', tagController.save);
tagRouter.put('/:id', tagController.update);
tagRouter.delete('/:id', tagController.delete);

export default tagRouter
