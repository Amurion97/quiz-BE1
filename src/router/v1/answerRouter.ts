import {Router} from 'express'
import answerController from "../../controller/answerController";


const answerRouter = Router()
answerRouter.post('', answerController.save);
answerRouter.put('/:id', answerController.update);
answerRouter.delete('/:id', answerController.delete);

export default answerRouter
