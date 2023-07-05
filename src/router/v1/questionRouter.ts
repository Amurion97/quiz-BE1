import {Router} from 'express'
import questionController from "../../controller/questionController";
import {auth} from "../../middleware/auth";
import {checkRoleTeacherOrAdmin} from "../../middleware/checkRoleTeacherOrAdmin";


const questionRouter = Router()
questionRouter.get('', auth, checkRoleTeacherOrAdmin, questionController.all);
questionRouter.get('/check/:id', auth, checkRoleTeacherOrAdmin, questionController.checkUsage);
questionRouter.get('/:id', auth, checkRoleTeacherOrAdmin, questionController.one);
questionRouter.post('', auth, checkRoleTeacherOrAdmin, questionController.save);
questionRouter.put('/:id', auth, checkRoleTeacherOrAdmin, questionController.update);
questionRouter.delete('/:id', auth, checkRoleTeacherOrAdmin, questionController.delete);

export default questionRouter
