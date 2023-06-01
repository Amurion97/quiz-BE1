import {Request, Response} from "express";
import airportService from "../service/airportService";

class AirportController {
    all = async (req: Request, res: Response) => {
        try {
            let airport = await airportService.all();
            res.status(200).json({
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

    one = async (req: Request, res: Response) => {
        try {
            let airport = await airportService.one(req.params.id);
            res.status(200).json({
                success: true,
                data: airport
            });
        } catch (e) {
            console.log("error in get a airport:", e)
            res.status(500).json({
                message: 'error in get a airport',
                success: false
            })
        }
    }
    save = async (req: Request, res: Response) => {
        try {
            await airportService.save(req.body);
            res.status(201).json({
                success: true,
                data: 'Add airport success!'
            });
        } catch (e) {
            console.log("error in add airport:", e)
            res.status(500).json({
                message: 'error in add airport',
                success: false
            })
        }
    }
    update = async (req: Request, res: Response) => {
        try {
            await airportService.update(req.params.id, req.body);
            res.status(201).json({
                success: true,
                data: 'update airport success!'
            });
        } catch (e) {
            console.log("error in update airport:", e)
            res.status(500).json({
                message: 'error in update airport',
                success: false
            })
        }
    }
    delete = async (req: Request, res: Response) => {
        try {
            await airportService.delete(req.params.id);
            res.status(201).json({
                success: true,
                data: 'delete airport success!'
            });
        } catch (e) {
            console.log("error in delete airport:", e)
            res.status(500).json({
                message: 'error in delete airport',
                success: false
            })
        }
    }
}

export default new AirportController();