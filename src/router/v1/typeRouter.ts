import {Router} from 'express'
import typeController from "../../controller/typeController";
import {checkRoleAdmin} from "../../middleware/checkRoleAdmin";
import {auth} from "../../middleware/auth";


const typeRouter = Router();
typeRouter.use(auth);
typeRouter.get('', typeController.all);

typeRouter.use(checkRoleAdmin);
typeRouter.post('', typeController.save);
typeRouter.put('/:id', typeController.update);
typeRouter.delete('/:id', typeController.delete);

export default typeRouter
