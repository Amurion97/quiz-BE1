import {Router} from 'express'
import difficultyController from "../../controller/difficultyController";


const difficultyRouter = Router()
difficultyRouter.get('', difficultyController.all);
difficultyRouter.post('', difficultyController.save);
difficultyRouter.put('/:id', difficultyController.update);
difficultyRouter.delete('/:id', difficultyController.delete);

export default difficultyRouter
