import {Router} from 'express'
import testController from "../../controller/testController";


const testRouter = Router()
testRouter.get('/', testController.findAll);
testRouter.get('/brief/:id', testController.findOneBrief);
testRouter.get('/:id', testController.findOne);
testRouter.post('', testController.save);
// testRouter.put('/:id', testController.update);
testRouter.delete('/:id', testController.delete);

export default testRouter
