import {Router} from 'express';
import classController from "../controller/classController";

const classRouter = Router()

classRouter.get('/', classController.all);
classRouter.get('/:id', classController.one);

export default classRouter