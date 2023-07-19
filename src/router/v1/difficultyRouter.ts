import {Router} from 'express'
import difficultyController from "../../controller/difficultyController";
import {auth} from "../../middleware/auth";
import {checkRoleAdmin} from "../../middleware/checkRoleAdmin";


const difficultyRouter = Router()
difficultyRouter.use(auth);
difficultyRouter.get('', difficultyController.all);

difficultyRouter.use(checkRoleAdmin)
difficultyRouter.post('', difficultyController.save);
difficultyRouter.put('/:id', difficultyController.update);
difficultyRouter.delete('/:id', difficultyController.delete);

export default difficultyRouter
