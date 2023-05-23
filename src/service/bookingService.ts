import {AppDataSource} from "../data-source";
import {Booking} from "../entity/Booking";

class BookingService {

    all = async () => {
        return await AppDataSource.createQueryBuilder()
            .select("booking")
            .from(Booking, "booking")
            .innerJoinAndSelect("booking.seat", "seat")
            .innerJoinAndSelect("seat.row","row")
            .innerJoinAndSelect("row.class", "class")
            .getMany()
    }
}

export default new BookingService();