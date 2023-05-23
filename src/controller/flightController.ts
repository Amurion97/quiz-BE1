import {Request, Response} from "express";
import flightService from "../service/flightService";


class FlightController {
    all = async (req: Request, res: Response) => {
        try {
            let flights = await flightService.all()
            res.status(201).json({
                data: flights,
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
    save = async (req: Request, res: Response) => {
        try {
            console.log(req.body)
            await flightService.save(req.body);
            res.status(201).json({
                success: true,
                data: 'Add flight success!'
            });
        } catch (e) {
            console.log("error in add flight:", e)
            res.status(500).json({
                message: 'error in add flight',
                success: false
            })
        }
    }
    update = async (req: Request, res: Response) => {
        try {
            await flightService.update(req.params.id, req.body);
            res.status(201).json({
                success: true,
                data: 'update flight success!'
            });
        } catch (e) {
            console.log("error in update flight:", e)
            res.status(500).json({
                message: 'error in update flight',
                success: false
            })
        }
    }
    delete = async (req: Request, res: Response) => {
        try {
            await flightService.delete(req.params.id);
            res.status(201).json({
                success: true,
                data: 'delete flight success!'
            });
        } catch (e) {
            console.log("error in delete flight:", e)
            res.status(500).json({
                message: 'error in delete flight',
                success: false
            })
        }
    }
}

export default new FlightController();
