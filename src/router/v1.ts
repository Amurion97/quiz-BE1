import {Router} from "express";
import userRouter from "./v1/userRouter";
import seatRouter from "./seatRouter";
import rowRouter from "./rowRouter";
import roleRouter from "./v1/roleRouter";
import airlineRouter from "./airlineRouter";
import aircraftRouter from "./aircraftRouter";
import bookingRouter from "./bookingRouter";
import classRouter from "./classRouter";
import flightRouter from "./flightRouter";
import airportRouter from "./airportRouter";
import tagRouter from "./v1/tagRouter";
import answerRouter from "./v1/answerRouter";
import questionRouter from "./v1/questionRouter";
import typeRouter from "./v1/typeRouter";
import difficultyRouter from "./v1/difficultyRouter";

const routerV1 = Router();
routerV1.use('/users', userRouter);
routerV1.use('/seats', seatRouter);
routerV1.use('/rows', rowRouter);
routerV1.use('/roles', roleRouter);
routerV1.use('/airlines', airlineRouter);
routerV1.use('/aircraft', aircraftRouter);
routerV1.use('/bookings', bookingRouter);
routerV1.use('/classes', classRouter);
routerV1.use('/flights', flightRouter);
routerV1.use('/airports', airportRouter);
routerV1.use('/tags', tagRouter)
routerV1.use('/answers', answerRouter)
routerV1.use('/questions', questionRouter)
routerV1.use('/types', typeRouter)
routerV1.use('/difficulties', difficultyRouter)

export default routerV1;
