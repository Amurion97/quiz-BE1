import {Router} from 'express'
import answerController from "../../controller/answerController";
import {auth} from "../../middleware/auth";
import {checkRoleTeacherOrAdmin} from "../../middleware/checkRoleTeacherOrAdmin";


const answerRouter = Router()
answerRouter.post('', auth, checkRoleTeacherOrAdmin, answerController.save);
answerRouter.put('/:id', auth, checkRoleTeacherOrAdmin, answerController.update);
answerRouter.delete('/:id', auth, checkRoleTeacherOrAdmin, answerController.delete);

export default answerRouter
