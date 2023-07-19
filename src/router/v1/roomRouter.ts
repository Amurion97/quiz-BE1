import {Router} from 'express'
import roomController from "../../controller/roomController";
import {auth} from "../../middleware/auth";
import {checkRoleAdmin} from "../../middleware/checkRoleAdmin";
import {checkRoleTeacherOrAdmin} from "../../middleware/checkRoleTeacherOrAdmin";


const roomRouter = Router();
roomRouter.use(auth);
roomRouter.get('/',checkRoleAdmin, roomController.all);
roomRouter.get('/code/:code', checkRoleAdmin, roomController.findOne);
roomRouter.post('/',checkRoleTeacherOrAdmin, roomController.save);

export default roomRouter
