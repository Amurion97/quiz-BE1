import {Router} from 'express'
import attemptController from "../../controller/attemptController";
import {auth} from "../../middleware/auth";
import {checkRoleTeacherOrAdmin} from "../../middleware/checkRoleTeacherOrAdmin";


const attemptRouter = Router()
attemptRouter.get('/test/:id', auth, checkRoleTeacherOrAdmin, attemptController.allByTest);
attemptRouter.get('/mine', auth, attemptController.allByUser);
attemptRouter.post('', auth, attemptController.save);

export default attemptRouter
