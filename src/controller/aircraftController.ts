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

    allOfAnAirline = async (req: Request, res: Response) => {
        try {
            console.log("allOfAnAirline:", req.params.id)
            let aircraft = await aircraftService.allOfAnAirline(req.params.id);
            res.status(201).json({
                success: true,
                data: aircraft
            });
        } catch (e) {
            console.log("error in get all aircraft of an airline:", e)
            res.status(500).json({
                success: false,
                message: 'error in get all aircraft of an airline'
            })
        }
    }
    one = async (req: Request, res: Response) => {
        try {
            let aircraft = await aircraftService.one(req.params.id);
            res.status(201).json({
                success: true,
                data: aircraft
            });
        } catch (e) {
            console.log("error in get a aircraft:", e)
            res.status(500).json({
                message: 'error in get a aircraft',
                success: false
            })
        }
    }

    save = async (req: Request, res: Response) => {
        try {
            await aircraftService.save(req.body);
            res.status(201).json({
                success: true,
                data: 'Add aircraft success!'
            });
        } catch (e) {
            console.log("error in add aircraft:", e)
            res.status(500).json({
                message: 'error in add aircraft',
                success: false
            })
        }
    }
    update = async (req: Request, res: Response) => {
        try {
            await aircraftService.update(req.params.id, req.body);
            res.status(201).json({
                success: true,
                data: 'update aircraft success!'
            });
        } catch (e) {
            console.log("error in update aircraft:", e)
            res.status(500).json({
                message: 'error in update aircraft',
                success: false
            })
        }
    }
    delete = async (req: Request, res: Response) => {
        try {
            await aircraftService.delete(req.params.id);
            res.status(201).json({
                success: true,
                data: 'delete aircraft success!'
            });
        } catch (e) {
            console.log("error in delete aircraft:", e)
            res.status(500).json({
                message: 'error in delete aircraft',
                success: false
            })
        }
    }
}

export default new AircraftController();