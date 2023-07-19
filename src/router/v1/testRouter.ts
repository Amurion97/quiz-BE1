import {Router} from 'express'
import testController from "../../controller/testController";
import {checkRoleTeacherOrAdmin} from "../../middleware/checkRoleTeacherOrAdmin";
import {auth} from "../../middleware/auth";
import {checkAccDefaultTeacher} from "../../middleware/checkAccDefaultTeacher";


const testRouter = Router();
testRouter.use(auth);
testRouter.get('/', testController.findAll);
testRouter.get('/brief/:id', testController.findOneBrief);
testRouter.get('/:id', testController.findOne);

testRouter.use(checkRoleTeacherOrAdmin);
testRouter.post('', testController.save);
// testRouter.put('/:id', testController.update);
testRouter.delete('/:id', checkAccDefaultTeacher, testController.delete);

export default testRouter
