import {Router} from 'express'
import roleController from "../controller/roleController";

const roleRouter = Router()
roleRouter.get('', roleController.all);
roleRouter.post('', roleController.save);
roleRouter.put('/:id', roleController.update);
roleRouter.delete('/:id', roleController.delete);

export default roleRouter
