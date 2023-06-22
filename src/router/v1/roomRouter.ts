import {Router} from 'express'
import roomController from "../../controller/roomController";
import {auth} from "../../middleware/auth";
import {checkRoleAdmin} from "../../middleware/checkRoleAdmin";


const roomRouter = Router()
roomRouter.get('/', auth, checkRoleAdmin, roomController.all);

roomRouter.post('/', auth, roomController.save);

export default roomRouter
