import {AppDataSource} from "../data-source";
import {Flight} from "../entity/Flight";

class FlightService {
    private flightRepository = AppDataSource.getRepository(Flight);
    all = async () => {
        let flights = await AppDataSource.createQueryBuilder()
            .select("flight")
            .from(Flight, "flight")
            .innerJoinAndSelect("flight.aircraft", "aircraft")
            .innerJoinAndSelect("aircraft.airline", "airline")
            .innerJoinAndSelect("flight.rows", "rows")
            .innerJoinAndSelect("rows.class", "class")
            .getMany()
        return flights
    }

}

export default new FlightService()
