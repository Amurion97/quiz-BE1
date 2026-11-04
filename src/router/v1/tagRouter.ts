import {Router} from 'express'
import tagController from "../../controller/tagController";
import {checkRoleTeacherOrAdmin} from "../../middleware/checkRoleTeacherOrAdmin";
import {auth} from "../../middleware/auth";
import {checkAccDefaultTeacher} from "../../middleware/checkAccDefaultTeacher";


const tagRouter = Router();
tagRouter.use(auth);
tagRouter.get('', tagController.all);

tagRouter.use(checkRoleTeacherOrAdmin);
tagRouter.post('', tagController.save);
tagRouter.put('/:id', tagController.update);
tagRouter.delete('/:id', checkAccDefaultTeacher, tagController.delete);

export default tagRouter
