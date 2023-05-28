import {Router} from "express";
import userRouter from "./userRouter";
import seatRouter from "./seatRouter";
import rowRouter from "./rowRouter";
import roleRouter from "./roleRouter";
import airlineRouter from "./airlineRouter";
import aircraftRouter from "./aircraftRouter";
import bookingRouter from "./bookingRouter";
import classRouter from "./classRouter";
import flightRouter from "./flightRouter";
import airportRouter from "./airportRouter";

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

export default routerV1;
