import {Router} from 'express'
import questionController from "../../controller/questionController";


const questionRouter = Router()
questionRouter.get('', questionController.all);
questionRouter.get('/:id', questionController.one);
questionRouter.post('', questionController.save);
questionRouter.put('/:id', questionController.update);
questionRouter.delete('/:id', questionController.delete);

export default questionRouter
