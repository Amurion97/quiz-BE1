import {Router} from "express";
import userRouter from "./v1/userRouter";
import roleRouter from "./v1/roleRouter";
import tagRouter from "./v1/tagRouter";
import answerRouter from "./v1/answerRouter";
import questionRouter from "./v1/questionRouter";
import typeRouter from "./v1/typeRouter";
import difficultyRouter from "./v1/difficultyRouter";
import testRouter from "./v1/testRouter";

const routerV1 = Router();
routerV1.use('/users', userRouter);
routerV1.use('/roles', roleRouter);
routerV1.use('/tags', tagRouter)
routerV1.use('/answers', answerRouter)
routerV1.use('/questions', questionRouter)
routerV1.use('/types', typeRouter)
routerV1.use('/difficulties', difficultyRouter)
routerV1.use('/tests', testRouter)

export default routerV1;
