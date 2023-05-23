import {AppDataSource} from "../data-source";
import {Airline} from "../entity/Airline";

class AirportService {
    private airlineRepository = AppDataSource.getRepository(Airline);

    all = async () => {
        return await this.airlineRepository.find()
    }
}

export default new AirportService();