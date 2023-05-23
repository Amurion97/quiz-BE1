import {Request, Response} from "express";
import aircraftService from "../service/aircraftService";

class AircraftController {
    all = async (req: Request, res: Response) => {
        try {
            let aircraft = await aircraftService.all();
            res.status(201).json({
                success: true,
                data: aircraft
            });
        } catch (e) {
            console.log("error in get all aircraft:", e)
            res.status(500).json({
                success: false,
                message: 'error in get all aircraft'
            })
        }
    }
}

export default new AircraftController();