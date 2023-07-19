import {Router} from 'express'
import roleController from "../../controller/roleController";
import {auth} from "../../middleware/auth";
import {checkRoleAdmin} from "../../middleware/checkRoleAdmin";

const roleRouter = Router();
roleRouter.use(auth);
roleRouter.use(checkRoleAdmin);
roleRouter.get('', roleController.all);
roleRouter.post('', roleController.save);
roleRouter.put('/:id', roleController.update);
roleRouter.delete('/:id', roleController.delete);

export default roleRouter
