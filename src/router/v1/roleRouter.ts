import {Router} from 'express'
import roleController from "../../controller/roleController";
import {auth} from "../../middleware/auth";
import {checkRoleAdmin} from "../../middleware/checkRoleAdmin";

const roleRouter = Router()
roleRouter.get('', auth, checkRoleAdmin, roleController.all);
roleRouter.post('', auth, checkRoleAdmin, roleController.save);
roleRouter.put('/:id', auth, checkRoleAdmin, roleController.update);
roleRouter.delete('/:id', auth, checkRoleAdmin, roleController.delete);

export default roleRouter
