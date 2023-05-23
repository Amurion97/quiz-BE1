import {Request, Response} from "express";
import seatService from "../service/seatService";

class SeatController {
    all = async (req: Request, res: Response) => {
        try {
            let airport = await seatService.all();
            res.status(201).json({
                success: true,
                data: airport
            });
        } catch (e) {
            console.log("error in get all seat:", e)
            res.status(500).json({
                message: 'error in get all seat',
                success: false
            })
        }
    }
}

export default new SeatController();
