import {Router} from 'express'
import questionController from "../../controller/questionController";
import {auth} from "../../middleware/auth";
import {checkRoleTeacherOrAdmin} from "../../middleware/checkRoleTeacherOrAdmin";
import {checkAccDefaultTeacher} from "../../middleware/checkAccDefaultTeacher";
import {body} from "express-validator";
import difficultyService from "../../service/difficultyService";
import typeService from "../../service/typeService";
import tagService from "../../service/tagService";
import {createContentChain} from "../../middleware/validator/v1/questionValidator";
import {createTypeChain} from "../../middleware/validator/v1/typeValidator";
import {createDifficultyChain} from "../../middleware/validator/v1/difficultyValidator";
import {createTagsChain} from "../../middleware/validator/v1/tagValidator";

const questionRouter = Router()

questionRouter.use(auth);
questionRouter.use(checkRoleTeacherOrAdmin);
questionRouter.get('', questionController.all);
questionRouter.get('/check/:id', questionController.checkUsage);
questionRouter.get('/:id', questionController.one);
questionRouter.post('',
    createContentChain(),
    body('answers').isArray({min: 2, max: 5}),
    body('image').escape(),
    createTypeChain(),
    createDifficultyChain(),
    createTagsChain(),
    questionController.save);
questionRouter.put('/:id', questionController.update);
questionRouter.delete('/:id', checkAccDefaultTeacher, questionController.delete);

export default questionRouter
