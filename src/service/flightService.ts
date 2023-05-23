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
        console.log(flights)
        return flights
    }

    save = async (flight) => {
        await this.flightRepository.save(flight);
    }

    update = async (id, flight) => {
        await this.flightRepository.update({id: id}, flight);
    }

    delete = async (id) => {
        await this.flightRepository.delete({id: id});
    }

}

export default new FlightService()
