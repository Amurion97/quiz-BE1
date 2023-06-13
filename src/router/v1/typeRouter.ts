import {Router} from 'express'
import typeController from "../../controller/typeController";


const typeRouter = Router()
typeRouter.get('', typeController.all);
typeRouter.post('', typeController.save);
typeRouter.put('/:id', typeController.update);
typeRouter.delete('/:id', typeController.delete);

export default typeRouter
