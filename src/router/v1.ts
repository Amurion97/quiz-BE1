import {Router} from "express";
import airportController from "../controller/airportController";
import flightController from "../controller/flightController";
import userRouter from "./userRouter";
import airlineRouter from "./airlineRouter";

const routerV1 = Router();
routerV1.use('/users', userRouter);
routerV1.use('/airlines', airlineRouter);

routerV1.get('/airports', airportController.all);
routerV1.get('/flights', flightController.all);


export default routerV1;