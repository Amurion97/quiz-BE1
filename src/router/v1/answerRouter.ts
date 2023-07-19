import {Router} from 'express'
import answerController from "../../controller/answerController";
import {auth} from "../../middleware/auth";
import {checkRoleTeacherOrAdmin} from "../../middleware/checkRoleTeacherOrAdmin";


const answerRouter = Router()
answerRouter.use(auth);
answerRouter.use(checkRoleTeacherOrAdmin);
answerRouter.post('', answerController.save);
answerRouter.put('/:id', answerController.update);
answerRouter.delete('/:id', answerController.delete);

export default answerRouter
