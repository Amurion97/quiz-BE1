import {Request, Response} from "express";
import airlineService from "../service/airlineService";

class AirlineController {
    all = async (req: Request, res: Response) => {
        try {
            let airlines = await airlineService.all();
            res.status(201).json({
                success: true,
                data: airlines
            });
        } catch (e) {
            console.log("error in get all airline:", e)
            res.status(500).json({
                success: false,
                message: 'error in get all airline'
            })
        }
    }
}

export default new AirlineController();