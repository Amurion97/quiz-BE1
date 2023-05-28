import {AppDataSource} from "../data-source";
import {Airport} from "../entity/Airport";
import {Airline} from "../entity/Airline";

class AirportService {
    private airportRepository = AppDataSource.getRepository(Airport);
    all = async () => {
        return await this.airportRepository.find()
        // return await AppDataSource.createQueryBuilder()
        //     .select("airport")
        //     .from(Airport, "airport")
        //     .getMany()
    }

    one = async (id) => {
        return await this.airportRepository.findOneBy({
            id: id
        })
    }
}

export default new AirportService();