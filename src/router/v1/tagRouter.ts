import {Router} from 'express'
import tagController from "../../controller/tagController";
import {checkRoleTeacherOrAdmin} from "../../middleware/checkRoleTeacherOrAdmin";
import {auth} from "../../middleware/auth";
import {checkAccDefaultTeacher} from "../../middleware/checkAccDefaultTeacher";


const tagRouter = Router()
tagRouter.get('', auth, tagController.all);
tagRouter.post('', auth, checkRoleTeacherOrAdmin, tagController.save);
tagRouter.put('/:id', auth, checkRoleTeacherOrAdmin, tagController.update);
tagRouter.delete('/:id', auth, checkRoleTeacherOrAdmin, checkAccDefaultTeacher, tagController.delete);

export default tagRouter
