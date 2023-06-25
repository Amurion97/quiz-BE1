import {AppDataSource} from "../data-source";
import {RoomDetail} from "../entity/RoomDetail";
import roomService from "./roomService";

class RoomDetailService {
    private roomDetailRepository = AppDataSource.getRepository(RoomDetail);

    findAllByRoom = async (roomCode) => {
        return await this.roomDetailRepository.find({
            relations: {
                room: true,
            },
            where: {
                room: {
                    code: roomCode
                }
            }
        })
    }

    checkIsInRoom = async (roomCode, email) => {
        return await this.roomDetailRepository.findOne({
            relations: {
                room: true,
            },
            where: {
                room: {
                    code: roomCode
                },
                email: email,
                isOnline: true
            }
        })
    }

    save = async (socketId, roomCode, email) => {
        let currentDetail = await this.roomDetailRepository.findOne({
            relations: {
                room: true,
            },
            where: {
                room: {
                    code: roomCode
                },
                email: email,
            }
        })
        if (currentDetail) {
            currentDetail.isOnline = true;
            currentDetail.socketId = socketId;
            await this.roomDetailRepository.save(currentDetail)
        } else {
            let room = await roomService.findActiveByCode(roomCode)
            await this.roomDetailRepository.save({
                email: email,
                room: room,
                socketId: socketId,
            })
        }
    }

    leaveRoom = async (socketId) => {
        let currentDetail = await this.roomDetailRepository.findOne({
            where: {
                socketId: socketId
            },
            relations: {
                room: true
            }
        })
        if (currentDetail) {
            currentDetail.isOnline = false;
            await this.roomDetailRepository.save(currentDetail);
            return currentDetail
        } else {
            return null
        }
    }

    update = async (id: number, roomDetail: RoomDetail) => {
        await this.roomDetailRepository.update({id: id}, roomDetail)
    }


}

export default new RoomDetailService()
