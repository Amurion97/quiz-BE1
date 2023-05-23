import {AppDataSource} from "../data-source";
import {Airport} from "../entity/Airport";
import {Seat} from "../entity/Seat";

class SeatService {
    private seatRepository = AppDataSource.getRepository(Seat);

    all = async () => {
        let seats = await AppDataSource.createQueryBuilder()
            .select('seat')
            .from(Seat, 'seat')
            .innerJoinAndSelect('seat.row', 'row')
            .getMany()
        return seats
    }
}

export default new SeatService();
