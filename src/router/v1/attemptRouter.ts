import {Router} from 'express'
import attemptController from "../../controller/attemptController";
import {auth} from "../../middleware/auth";
import {checkRoleTeacherOrAdmin} from "../../middleware/checkRoleTeacherOrAdmin";


const attemptRouter = Router()
attemptRouter.use(auth)
attemptRouter.get('/test/:id', checkRoleTeacherOrAdmin, attemptController.allByTest);
attemptRouter.get('/mine', attemptController.allByUser);
attemptRouter.post('', attemptController.save);

export default attemptRouter
