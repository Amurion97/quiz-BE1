import {Router} from "express";
import airportController from "../controller/airportController";
import flightController from "../controller/flightController";
import userRouter from "./userRouter";

const routerV1 = Router();
routerV1.use('/users', userRouter);

routerV1.get('/airports', airportController.all);
routerV1.get('/flights', flightController.all);


export default routerV1;