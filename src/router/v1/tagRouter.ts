import {Router} from 'express'
import tagController from "../../controller/tagController";
import {checkRoleTeacherOrAdmin} from "../../middleware/checkRoleTeacherOrAdmin";
import {auth} from "../../middleware/auth";


const tagRouter = Router()
tagRouter.get('', auth, tagController.all);
tagRouter.post('', auth, checkRoleTeacherOrAdmin, tagController.save);
tagRouter.put('/:id', auth, checkRoleTeacherOrAdmin, tagController.update);
tagRouter.delete('/:id', auth, checkRoleTeacherOrAdmin, tagController.delete);

export default tagRouter
