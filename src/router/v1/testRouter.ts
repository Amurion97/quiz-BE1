import {Router} from 'express'
import testController from "../../controller/testController";
import {checkRoleTeacherOrAdmin} from "../../middleware/checkRoleTeacherOrAdmin";
import {auth} from "../../middleware/auth";


const testRouter = Router()
testRouter.get('/', auth, testController.findAll);
testRouter.get('/brief/:id', auth, testController.findOneBrief);
testRouter.get('/:id', auth, testController.findOne);
testRouter.post('', auth, checkRoleTeacherOrAdmin, testController.save);
// testRouter.put('/:id', testController.update);
testRouter.delete('/:id', auth, checkRoleTeacherOrAdmin, testController.delete);

export default testRouter
