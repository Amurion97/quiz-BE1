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
    one = async (req: Request, res: Response) => {
        try {
            let booking = await bookingService.one(req.params.id);
            res.status(201).json({
                success: true,
                data: booking
            });
        } catch (e) {
            console.log("error in get a booking:", e)
            res.status(500).json({
                message: 'error in get a booking',
                success: false
            })
        }
    }

    save = async (req: Request, res: Response) => {
        try {
            req.body.user = req['decode']['id'];
            await bookingService.save(req.body);
            res.status(201).json({
                success: true,
                data: 'Add booking success!'
            });
        } catch (e) {
            console.log("error in add booking:", e)
            res.status(500).json({
                message: 'error in add booking',
                success: false
            })
        }
    }
    update = async (req: Request, res: Response) => {
        try {
            await bookingService.update(req.params.id, req.body);
            res.status(201).json({
                success: true,
                data: 'update booking success!'
            });
        } catch (e) {
            console.log("error in update booking:", e)
            res.status(500).json({
                message: 'error in update booking',
                success: false
            })
        }
    }
    delete = async (req: Request, res: Response) => {
        try {
            await bookingService.delete(req.params.id);
            res.status(201).json({
                success: true,
                data: 'delete booking success!'
            });
        } catch (e) {
            console.log("error in delete booking:", e)
            res.status(500).json({
                message: 'error in delete booking',
                success: false
            })
        }
    }
}

export default new BookingController();