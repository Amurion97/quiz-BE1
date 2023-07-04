import {Router} from 'express'
import typeController from "../../controller/typeController";
import {checkRoleAdmin} from "../../middleware/checkRoleAdmin";
import {auth} from "../../middleware/auth";


const typeRouter = Router()
typeRouter.get('', auth, typeController.all);
typeRouter.post('', auth, checkRoleAdmin, typeController.save);
typeRouter.put('/:id', auth, checkRoleAdmin, typeController.update);
typeRouter.delete('/:id', auth, checkRoleAdmin, typeController.delete);

export default typeRouter
