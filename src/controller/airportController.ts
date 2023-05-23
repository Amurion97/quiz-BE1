import {Request, Response} from "express";
import airportService from "../service/airportService";

class AirportController {
    all = async (req: Request, res: Response) => {
        try {
            let airport = await airportService.all();
            res.status(201).json({
                success: true,
                data: airport
            });
        } catch (e) {
            console.log("error in get all airport:", e)
            res.status(500).json({
                message: 'error in get all airport',
                success: false
            })
        }
    }
}

export default new AirportController();