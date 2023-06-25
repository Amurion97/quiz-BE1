import {AppDataSource} from "../data-source";
import testService from "./testService";
import {Room} from "../entity/Room";
import {OTP6Gen} from "./misc/OTP";
import userService from "./userService";
import {emitKeypressEvents} from "readline";

class RoomService {
    private roomRepository = AppDataSource.getRepository(Room);

    findAll = async () => {
        return await this.roomRepository.find({
            relations: {
                user: true,
                test: true
            },
            select: {
                user: {
                    email: true
                },
                test: {
                    name: true
                }
            }
        })
    }

    findActiveByCode = async (code) => {
        return await this.roomRepository.findOne({
            where: {
                code: code,
                isActive: true
            },
            relations: {
                user: true
            },
            select: {
                user: {
                    email: true
                }
            }

        })
    }
    findOne = async (code)=>{
        return await this.roomRepository.findOne({
            where: {
                code: code
            },
            relations: {
                test:true
            }
        })
    }

    createNewRoom = async (room) => {
        let code = OTP6Gen();
        while (await this.findActiveByCode(code)) {
            code = OTP6Gen()
        }
        const newRoom = new Room();
        // newRoom.code = code;
        // newRoom.user = await userService.one(userID);
        // newRoom.test = await testService.findOne(testID);
        room.code = code
        return await this.roomRepository.save(room)
    }

}

export default new RoomService()
