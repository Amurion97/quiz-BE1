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
            .innerJoinAndSelect("row.flight", "flight")
            .innerJoinAndSelect("flight.aircraft", "aircraft")
            .innerJoinAndSelect("flight.from", "from")
            .innerJoinAndSelect("flight.to", "to")
            .innerJoinAndSelect("aircraft.airline", "airline")
            .getMany()
    }

    one = async (id) => {
        return await AppDataSource.createQueryBuilder()
            .select("booking")
            .from(Booking, "booking")
            .innerJoinAndSelect("booking.seat", "seat")
            .innerJoinAndSelect("seat.row","row")
            .innerJoinAndSelect("row.class", "class")
            .innerJoinAndSelect("row.flight", "flight")
            .innerJoinAndSelect("flight.aircraft", "aircraft")
            .innerJoinAndSelect("flight.from", "from")
            .innerJoinAndSelect("flight.to", "to")
            .innerJoinAndSelect("aircraft.airline", "airline")
            .where("booking.id = :id", {id: id})
            .getOne()
    }

    save = async (booking) => {
        await AppDataSource.createQueryBuilder()
            .insert()
            .into(Booking)
            .values([
                {seat: booking.seat, user: booking.user}
            ])
            .execute()
    }

    update = async (id, booking) => {
        await AppDataSource.createQueryBuilder()
            .update(Booking)
            .set({seat: booking.seat})
            .where("id = :id", {id: id})
            .execute()
    }

    delete = async (id) => {
        await AppDataSource.createQueryBuilder()
            .delete()
            .from(Booking)
            .where("id = :id", {id: id})
            .execute()
    }

}

export default new BookingService();