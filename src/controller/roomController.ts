import {Request, Response} from "express";
import roomService from "../service/roomService";

class roomController {
    all = async (req: Request, res: Response) => {
        try {
            let rooms = await roomService.findAll();
            console.log(rooms)
            res.status(201).json(rooms);
        } catch (e) {
            console.log("error in get all room:", e)
            res.status(500).json({
                message: 'error in get all room',
                success: false
            })
        }
    }
    findOne=async (req:Request,res:Response)=>{
        try {
            let roomId = await roomService.findOne(req.params.code);
            console.log(roomId)
            res.status(201).json(roomId)

        }catch (e){
            console.log("error in get room: ",e)
            res.status(500).json({
                message: 'error in get room',
                success: false
            })
        }
    }

    save = async (req: Request, res: Response) => {
        try {
            req.body.user = req['decode'].id;
            let newRoom = await roomService.createNewRoom(req.body);
            res.status(201).json(newRoom.code);
        } catch (e) {
            console.log("error in add room:", e)
            res.status(500).json({
                message: 'error in add room',
                success: false
            })
        }
    }

}

export default new roomController();
