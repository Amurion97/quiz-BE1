import {Router} from 'express';
import bookingController from "../controller/bookingController";

const bookingRouter = Router()

bookingRouter.get('/', bookingController.all);

export default bookingRouter