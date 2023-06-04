import {AppDataSource} from "../data-source";
import {Booking} from "../entity/Booking";

class BookingService {
    private bookingRepository = AppDataSource.getRepository(Booking)
    all = async () => {
        return await this.bookingRepository.find({
            relations: {
                tickets: {
                    seat: {
                        row: {
                            class: true,
                            flight: {
                                from: true,
                                to: true,
                                aircraft: {
                                    airline: true
                                }
                            }
                        }
                    }
                },
            }
        })

        return await AppDataSource.createQueryBuilder()
            .select("booking")
            .from(Booking, "booking")
            .innerJoinAndSelect("booking.seat", "seat")
            .innerJoinAndSelect("seat.row", "row")
            .innerJoinAndSelect("row.class", "class")
            .innerJoinAndSelect("row.flight", "flight")
            .innerJoinAndSelect("flight.aircraft", "aircraft")
            .innerJoinAndSelect("flight.from", "from")
            .innerJoinAndSelect("flight.to", "to")
            .innerJoinAndSelect("aircraft.airline", "airline")
            .getMany()
    }

    one = async (id) => {
        return await this.bookingRepository.findOne({
            relations: {
                tickets: {
                    seat: {
                        row: {
                            class: true,
                            flight: {
                                from: true,
                                to: true,
                                aircraft: {
                                    airline: true
                                }
                            }
                        }
                    }
                }
            },
            where: {
                id: id
            }
        })

        return await AppDataSource.createQueryBuilder()
            .select("booking")
            .from(Booking, "booking")
            .innerJoinAndSelect("booking.seat", "seat")
            .innerJoinAndSelect("seat.row", "row")
            .innerJoinAndSelect("row.class", "class")
            .innerJoinAndSelect("row.flight", "flight")
            .innerJoinAndSelect("flight.aircraft", "aircraft")
            .innerJoinAndSelect("flight.from", "from")
            .innerJoinAndSelect("flight.to", "to")
            .innerJoinAndSelect("aircraft.airline", "airline")
            .where("booking.id = :id", {id: id})
            .getOne()
    }

    oneSearch = async (booking) => {
        return await this.bookingRepository.findOne({
            relations: {
                tickets: {
                    seat: {
                        row: {
                            class: true,
                            flight: {
                                from: true,
                                to: true,
                                aircraft: {
                                    airline: true
                                }
                            }
                        }
                    }
                },
            },
            where: {
                email: booking.email,
                phoneNumber: booking.phoneNumber
            }
        })
    }

    save = async (booking) => {
        return await this.bookingRepository.save(booking)
    }

    update = async (id, booking) => {
        await this.bookingRepository.update({id: id}, booking)
    }

    delete = async (id) => {
        await this.bookingRepository.delete({id: id})
        await AppDataSource.createQueryBuilder()
            .delete()
            .from(Booking)
            .where("id = :id", {id: id})
            .execute()
    }

}

export default new BookingService();