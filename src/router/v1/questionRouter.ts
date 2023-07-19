import {Router} from 'express'
import questionController from "../../controller/questionController";
import {auth} from "../../middleware/auth";
import {checkRoleTeacherOrAdmin} from "../../middleware/checkRoleTeacherOrAdmin";
import {checkAccDefaultTeacher} from "../../middleware/checkAccDefaultTeacher";
import {body} from "express-validator";


const questionRouter = Router()
questionRouter.use(auth);
questionRouter.use(checkRoleTeacherOrAdmin);
questionRouter.get('', questionController.all);
questionRouter.get('/check/:id', questionController.checkUsage);
questionRouter.get('/:id', questionController.one);
questionRouter.post('',
    body('content').trim().notEmpty().escape(),
    body('answers'),
    body('image').escape(),
    body('tags'),
    body('type'),
    body('difficulty'),
    questionController.save);
questionRouter.put('/:id', questionController.update);
questionRouter.delete('/:id', checkAccDefaultTeacher, questionController.delete);

export default questionRouter
