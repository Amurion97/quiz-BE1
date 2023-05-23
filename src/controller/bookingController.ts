import {Request, Response} from "express";
import bookingService from "../service/bookingService";

class BookingController {
    all = async (req: Request, res: Response) => {
        try {
            let bookings = await bookingService.all();
            res.status(201).json({
                success: true,
                data: bookings
            });
        } catch (e) {
            console.log("error in get all booking:", e)
            res.status(500).json({
                success: false,
                message: 'error in get all booking'
            })
        }
    }
}

export default new BookingController();