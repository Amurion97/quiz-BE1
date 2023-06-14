import {AppDataSource} from "../data-source";
import {Flight} from "../entity/Flight";
import {ArrayContains, Between, Equal, IsNull, MoreThan, Not} from "typeorm";
import {isNull} from "util";

class FlightService {
    private flightRepository = AppDataSource.getRepository(Flight);
    all2 = async (queries) => {
        let flights = await AppDataSource.createQueryBuilder()
            .select("flight")
            .from(Flight, "flight")
            .innerJoinAndSelect("flight.aircraft", "aircraft")
            .innerJoinAndSelect("aircraft.airline", "airline")
            // .leftJoinAndSelect("flight.rows", "rows")
            .leftJoin("flight.rows", "rows")
            .innerJoinAndSelect("flight.from", "from")
            .innerJoinAndSelect("flight.to", "to")
            .leftJoin("rows.class", "class")
            // .leftJoinAndSelect("rows.class", "class")
            .orderBy("flight.id")
            // .where("from.id = :fromId", {fromId: queries.from})
            .where("class.id = :classId", {classId: queries.class})
            .getMany()
        return flights
    }

    all = async (queries) => {
        console.log("queries:", queries)
        let startPlus = new Date(queries.start);
        startPlus.setDate(startPlus.getDate() + 1)
        console.log("start:", new Date(queries.start), startPlus, new Date(0))
        return await this.flightRepository.find({
            where: {
                from: (queries.from) ? Equal(parseInt(queries.from)) : Not(IsNull()),
                to: (queries.to) ? Equal(parseInt(queries.to)) : Not(IsNull()),
                start: (queries.start) ? Between(new Date(queries.start), startPlus) : Not(IsNull()),
                rows: {
                    // class: queries.class ? ArrayContains([parseInt(queries.class)]) : Not(IsNull()),
                    // class: queries.class ? Equal(parseInt(queries.class)) : Not(IsNull()),
                    class: queries.class ? Equal(parseInt(queries.class)) : Not(0),
                },
                // isCanceled: false,
            },
            select: {
                rows: {
                    class: {
                        name: false
                    },
                    price: true
                },
            },
            relations: {
                aircraft: {
                    airline: true
                },
                //rows should not be selected but still have in where condition
                rows: {
                    class: true
                },
                from: true,
                to: true
            },
            order: {
                id: "ASC",
                rows: {
                    price: "ASC",
                }
            },
            // skip: queries.skip? queries.skip : 0,
            // take: 10
        })
    }
    one = async (id) => {
        return await this.flightRepository.findOne({
            where: {
                id: id
            },
            relations: {
                aircraft: {
                    airline: true
                },
                //rows should not be selected but still have in where condition
                rows: {
                    class: true,
                    seats: true
                },
                from: true,
                to: true
            },
            order: {
                rows: {
                    name: "ASC",
                    seats: {
                        no: "ASC"
                    }
                }
            },
        },)
    }

    save = async (flight) => {
        return await this.flightRepository.save(flight);
    }

    update = async (id, flight) => {
        await this.flightRepository.update({id: id}, flight);
    }

    delete = async (id) => {
        await this.flightRepository.update({id: id}, {
            isCanceled: true
        });
    }

}

export default new FlightService()
