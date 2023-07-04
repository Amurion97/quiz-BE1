import {Router} from 'express'
import roomController from "../../controller/roomController";
import {auth} from "../../middleware/auth";
import {checkRoleAdmin} from "../../middleware/checkRoleAdmin";
import {checkRoleTeacherOrAdmin} from "../../middleware/checkRoleTeacherOrAdmin";


const roomRouter = Router()
roomRouter.get('/', auth, checkRoleAdmin, roomController.all);
roomRouter.get('/code/:code', auth, checkRoleAdmin, roomController.findOne);
roomRouter.post('/', auth, checkRoleTeacherOrAdmin, roomController.save);

export default roomRouter
