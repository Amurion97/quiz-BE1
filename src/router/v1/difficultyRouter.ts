import {Router} from 'express'
import difficultyController from "../../controller/difficultyController";
import {auth} from "../../middleware/auth";
import {checkRoleAdmin} from "../../middleware/checkRoleAdmin";


const difficultyRouter = Router()
difficultyRouter.get('', auth, difficultyController.all);
difficultyRouter.post('', auth, checkRoleAdmin, difficultyController.save);
difficultyRouter.put('/:id', auth, checkRoleAdmin, difficultyController.update);
difficultyRouter.delete('/:id', auth, checkRoleAdmin, difficultyController.delete);

export default difficultyRouter
