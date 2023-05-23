import {Request, Response} from "express";
import seatService from "../service/seatService";

class SeatController {
    all = async (req: Request, res: Response) => {
        try {
            let seats = await seatService.all();
            res.status(201).json({
                success: true,
                data: seats
            });
        } catch (e) {
            console.log("error in get all seat:", e)
            res.status(500).json({
                message: 'error in get all seat',
                success: false
            })
        }
    }
    save = async (req: Request, res: Response) => {
        try {
            await seatService.save(req.body);
            res.status(201).json({
                success: true,
                data: 'Add seat success!'
            });
        } catch (e) {
            console.log("error in add seat:", e)
            res.status(500).json({
                message: 'error in add seat',
                success: false
            })
        }
    }
    update = async (req: Request, res: Response) => {
        try {
            await seatService.update(req.params.id, req.body);
            res.status(201).json({
                success: true,
                data: 'update seat success!'
            });
        } catch (e) {
            console.log("error in update seat:", e)
            res.status(500).json({
                message: 'error in update seat',
                success: false
            })
        }
    }
    delete = async (req: Request, res: Response) => {
        try {
            await seatService.delete(req.params.id);
            res.status(201).json({
                success: true,
                data: 'delete seat success!'
            });
        } catch (e) {
            console.log("error in delete seat:", e)
            res.status(500).json({
                message: 'error in delete seat',
                success: false
            })
        }
    }
}

export default new SeatController();
