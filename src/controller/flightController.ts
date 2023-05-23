import {Request, Response} from "express";
import flightService from "../service/flightService";


class FlightController {
    all = async (req: Request, res: Response) => {
        try {
            let flight = await flightService.all()
            res.status(201).json({
                data: flight,
                success: true
            });
        } catch (e) {
            console.log("error in show all flights:", e)
            res.status(500).json({
                message: "get flights failed",
                success: false
            })
        }
    }
}

export default new FlightController();