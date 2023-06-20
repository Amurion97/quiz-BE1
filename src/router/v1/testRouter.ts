import {Router} from 'express'
import testController from "../../controller/testController";


const testRouter = Router()
testRouter.get('', testController.all);
testRouter.get('/:id', testController.one);
testRouter.post('', testController.save);
// testRouter.put('/:id', testController.update);
testRouter.delete('/:id', testController.delete);

export default testRouter
