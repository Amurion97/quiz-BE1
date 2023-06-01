import {AppDataSource} from "../data-source";
import {Seat} from "../entity/Seat";
import * as bcrypt from "bcrypt";

class SeatService {
    private seatRepository = AppDataSource.getRepository(Seat);

    all = async () => {
        return await AppDataSource.createQueryBuilder()
            .select('seat')
            .from(Seat, 'seat')
            .innerJoinAndSelect('seat.row', 'row')
            .getMany()
    }

    one = async (id) => {
        return await this.seatRepository.findOne({
            relations: {
                row: true
            },
            where: {
                id: id
            }
        })
    }
    save = async (seat) => {
        await this.seatRepository.save(seat);
    }

    saveARow = async (setNum, rowId) => {
        for (let i = 1; i <= setNum; i++) {
            await this.seatRepository.save({
                no: i,
                row: rowId
            });
        }

    }

    update = async (id, seat) => {
        await this.seatRepository.update({id: id}, seat);
    }
    disable = async (id) => {
        await this.seatRepository.save({id: id, isAvailable: false});
    }

    delete = async (id) => {
        await this.seatRepository.delete({id: id});
    }


}

export default new SeatService();
