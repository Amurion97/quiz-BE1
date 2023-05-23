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
    one = async (req: Request, res: Response) => {
        try {
            let airline = await airlineService.one(req.params.id);
            res.status(201).json({
                success: true,
                data: airline
            });
        } catch (e) {
            console.log("error in get a airline:", e)
            res.status(500).json({
                message: 'error in get a airline',
                success: false
            })
        }
    }

    save = async (req: Request, res: Response) => {
        try {
            await airlineService.save(req.body);
            res.status(201).json({
                success: true,
                data: 'Add airline success!'
            });
        } catch (e) {
            console.log("error in add airline:", e)
            res.status(500).json({
                message: 'error in add airline',
                success: false
            })
        }
    }
    update = async (req: Request, res: Response) => {
        try {
            await airlineService.update(req.params.id, req.body);
            res.status(201).json({
                success: true,
                data: 'update airline success!'
            });
        } catch (e) {
            console.log("error in update airline:", e)
            res.status(500).json({
                message: 'error in update airline',
                success: false
            })
        }
    }
    delete = async (req: Request, res: Response) => {
        try {
            await airlineService.delete(req.params.id);
            res.status(201).json({
                success: true,
                data: 'delete airline success!'
            });
        } catch (e) {
            console.log("error in delete airline:", e)
            res.status(500).json({
                message: 'error in delete airline',
                success: false
            })
        }
    }
}

export default new AirlineController();